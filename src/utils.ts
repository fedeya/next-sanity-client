export function getQueryString(query: string, perspective: string, params?: Record<string, any>) {
  const enc = encodeURIComponent;

  const queryParam = `?query=${enc(query)}`;

  if (!params) return queryParam;

  const paramsParam = Object.entries(params)
    .map(([key, value]) => `${enc(`$${key}`)}=${enc(JSON.stringify(value))}`)
    .join('&');

  const perspectiveParam = `perspective=${enc(perspective)}`

  return `${queryParam}&${paramsParam}&${perspectiveParam}`;
}
