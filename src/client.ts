import type {
  ClientConfig,
  ClientFetchParams,
  FetchConfig,
  Union
} from './types';
import { getQueryString } from './utils';

const API_HOST = 'api.sanity.io';
const CDN_HOST = 'apicdn.sanity.io';

export class SanityClient<
  Q extends Record<string, string> = Record<string, string>
> {
  constructor(private config: ClientConfig<Q>) {}

  async fetch<T = unknown, P = Record<string, unknown>>({
    query,
    params,
    config
  }: ClientFetchParams<P>): Promise<T> {
    const qs = getQueryString(query, params as any);

    const usePost = qs.length > 11264;

    const version = this.config.apiVersion
      ? `v${this.config.apiVersion.replace(/^v/, '')}`
      : 'v1';

    const host = this.config.useCdn ? CDN_HOST : API_HOST;

    const headers = new Headers();

    if (this.config.token)
      headers.set('Authorization', `Bearer ${this.config.token}`);

    if (usePost) headers.set('Content-Type', 'application/json');

    const url = `https://${this.config.projectId}.${host}/${version}/data/query/${this.config.dataset}`;

    const res = await fetch(`${url}${usePost ? '' : qs}`, {
      method: usePost ? 'POST' : 'GET',
      body: usePost ? JSON.stringify({ query, params: params }) : undefined,
      headers,
      ...config
    });

    if (res.ok) {
      const data = await res.json();

      return data.result;
    }

    if (res.headers.get('content-type')?.includes('application/json')) {
      const error = await res.json();

      throw new Error(error.message);
    }

    throw new Error(`Error fetching data: ${res.statusText}`);
  }

  public createApiUtil<
    T = unknown,
    P extends Record<string, unknown> = Record<string, unknown> | never
  >(query: Union<keyof Q>, config?: FetchConfig) {
    const { queries } = this.config;

    const groqQuery =
      queries && queries[query] ? queries[query] : (query as string);

    return async (params?: P & FetchConfig): Promise<T> => {
      const { cache, next, ...rest } = params || {};

      return this.fetch<T>({
        query: groqQuery,
        params: Object.keys(rest).length > 0 ? rest : undefined,
        config: { cache: cache ?? config?.cache, next: next ?? config?.next }
      });
    };
  }
}
