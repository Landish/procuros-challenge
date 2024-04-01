import { renderHook, act } from '@testing-library/react-hooks';
import { useFiltersStore } from '@/store';

describe('useFiltersStore', () => {
  it('should update the `search` when calling `setSearch`', () => {
    const { result } = renderHook(() => useFiltersStore());

    expect(result.current.search).toBe('');

    act(() => {
      result.current.setSearch('keyword');
    });

    expect(result.current.search).toBe('keyword');
  });

  it('should update the `search` and `filters` when calling `initFilters`', () => {
    const { result } = renderHook(() => useFiltersStore());

    act(() => {
      result.current.initFilters({
        search: 'keyword',
        filters: {
          status: ['pending'],
          category: ['a', 'b'],
        },
      });
    });

    expect(result.current.search).toBe('keyword');
    expect(result.current.filters).toEqual({
      status: ['pending'],
      category: ['a', 'b'],
    });
  });

  it('should update the `filters` when calling `setFilter`', () => {
    const { result } = renderHook(() => useFiltersStore());

    act(() => {
      result.current.setFilter('status', ['pending']);
      result.current.setFilter('category', ['a', 'b']);
    });

    expect(result.current.filters).toEqual({
      status: ['pending'],
      category: ['a', 'b'],
    });
  });

  it('should update the `filters` when calling `removeFromFilter`', () => {
    const { result } = renderHook(() => useFiltersStore());

    act(() => {
      result.current.setFilter('status', ['pending']);
      result.current.removeFromFilter('status', 'pending');
    });

    expect(result.current.filters.status).toEqual([]);
  });

  it('should reset `search` and `filters` when calling `reset`', () => {
    const { result } = renderHook(() => useFiltersStore());

    act(() => {
      result.current.reset();
    });

    expect(result.current.search).toEqual('');
    expect(result.current.filters).toEqual({});
  });
});
