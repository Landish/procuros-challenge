import qs from 'qs';

type Filters = Record<string, string[]>;

interface QueryStringParams {
  search?: string;
  filters?: Filters;
}

/**
 * Converts search and filters to query string.
 * @example { search: 'foo', filters: { type: ['bar', 'baz'] } } -> 'search=foo&filter[type]=bar,baz'
 */
export function createQueryString({ search, filters }: QueryStringParams) {
  return qs.stringify(
    { search: search || null, filters },
    {
      arrayFormat: 'comma',
      encode: false,
      skipNulls: true,
    },
  );
}

/***
 * Converts search and filters to query string (for Mock API).
 * @example { search: 'foo', filters: { type: ['bar', 'baz'] } } -> 'search=foo&type=bar|baz'
 */
export function createQueryStringForApi(params: QueryStringParams) {
  const { search, filters } = params;
  return qs
    .stringify(
      { search: search || null, ...filters },
      {
        arrayFormat: 'comma',
        encode: false,
        skipNulls: true,
      },
    )
    .replaceAll(',', '|');
}

/**
 * Converts query string to search and filters object (for state).
 *
 * @example 'search=foo&filter[type]=bar,baz' -> { search: 'foo', filters: { type: ['bar', 'baz'] } }
 */
export function createObjectFromQueryString(
  queryString: string,
): QueryStringParams {
  const parsed = qs.parse(queryString);

  const result: QueryStringParams = {
    search: (parsed?.search as string) ?? '',
    filters: {},
  };

  if (parsed?.search) {
    result.search = parsed.search as string;
  }

  if (parsed?.filters) {
    Object.keys(parsed.filters).forEach((key) => {
      // @ts-ignore
      result.filters[key] = parsed?.filters?.[key]?.split(',') ?? [];
    });
  }

  return result;
}
