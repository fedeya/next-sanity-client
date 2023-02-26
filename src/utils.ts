export function getQueryString(query: string, params?: Record<string, any>) {
  const enc = encodeURIComponent;

  const queryParam = `?query=${enc(query)}`;

  if (!params) return queryParam;

  const paramsParam = Object.entries(params)
    .map(([key, value]) => `${enc(`$${key}`)}=${enc(JSON.stringify(value))}`)
    .join('&');

  return `${queryParam}&${paramsParam}`;
}
