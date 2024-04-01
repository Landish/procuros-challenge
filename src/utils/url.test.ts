import { createObjectFromQueryString, createQueryString } from '@/utils';

describe('createQueryString', () => {
  it('returns query string with `search` param', () => {
    expect(createQueryString({ search: 'keyword' })).toBe('search=keyword');
  });
  it('returns query string with `filters` param', () => {
    expect(
      createQueryString({ filters: { category: ['a', 'b'], status: ['c'] } }),
    ).toBe('filters[category]=a,b&filters[status]=c');
  });

  it('returns query string with `search` and `filters` params combined', () => {
    expect(
      createQueryString({
        search: 'keyword',
        filters: { category: ['a', 'b'], status: ['c'] },
      }),
    ).toBe('search=keyword&filters[category]=a,b&filters[status]=c');
  });
});

describe('createObjectFromQueryString', () => {
  it('returns object from `search` query', () => {
    expect(createObjectFromQueryString('search=keyword')).toEqual(
      expect.objectContaining({
        search: 'keyword',
      }),
    );
  });
  it('returns object from `filters` query', () => {
    expect(
      createObjectFromQueryString('filters[category]=a,b&filters[status]=c'),
    ).toEqual(
      expect.objectContaining({
        filters: { category: ['a', 'b'], status: ['c'] },
      }),
    );
  });
});
