export interface ClientConfig<
  T extends Record<string, string> = Record<string, string>
> {
  projectId: string;
  dataset: string;
  token?: string;
  apiVersion?: string;
  useCdn?: boolean;
  queries?: T;
}

export interface FetchConfig {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export type Union<T> = T | (string & {});

export type ClientFetch<T = unknown, P = Record<string, unknown>> = (
  params: ClientFetchParams<P>
) => Promise<T>;

export type ClientFetchParams<P = Record<string, unknown>> = {
  params?: P;
  query: string;
  config?: FetchConfig;
};
