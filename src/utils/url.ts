type Filters = Record<string, string[]>;

interface QueryStringParams {
  search: string;
  filters: Filters;
}

/**
 * Converts search and filters to query string.
 * @example { search: 'foo', filters: { type: ['bar', 'baz'] } } -> 'search=foo&filter[type]=bar,baz'
 */
export function createQueryString({ search, filters }: QueryStringParams) {
  const searchParams = new URLSearchParams();

  if (search) {
    searchParams.set('search', search);
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value.length > 0) {
      searchParams.set(`filter[${key}]`, value.join(','));
    }
  });

  return decodeURIComponent(searchParams.toString());
}

/***
 * Converts search and filters to query string (for Mock API).
 * @example { search: 'foo', filters: { type: ['bar', 'baz'] } } -> 'search=foo&type=bar|baz'
 */
export function createQueryStringForApi({
  search,
  filters,
}: QueryStringParams) {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.set('search', search);
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value.length > 0) {
      searchParams.set(key, value.join('|'));
    }
  });

  return decodeURIComponent(searchParams.toString());
}

/**
 * Converts query string to search and filters object (for state).
 *
 * @example 'search=foo&filter[type]=bar,baz' -> { search: 'foo', filters: { type: ['bar', 'baz'] } }
 */
export function createObjectFromQueryString(
  searchParams: URLSearchParams,
): QueryStringParams {
  const search = searchParams.get('search') || '';
  const status = searchParams.get('filter[status]')?.split(',') || [];
  const category = searchParams.get('filter[category]')?.split(',') || [];

  return { search, filters: { status, category } };
}
