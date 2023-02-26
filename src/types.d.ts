import type * as Next from 'next';

interface ClientConfig<
  T extends Record<string, string> = Record<string, string>
> {
  projectId: string;
  dataset: string;
  token?: string;
  apiVersion?: string;
  useCdn?: boolean;
  queries?: T;
}

interface FetchConfig {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

type Union<T> = T | (string & {});

type ClientFetch<T = unknown, P = Record<string, unknown>> = (params: {
  params?: P;
  query: string;
  config?: FetchConfig;
}) => Promise<T>;
