import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFiltersStore } from '@/store';
import { createQueryString } from '@/utils';

/**
 * Hook that synchronizes partners filters with query params and vice versa
 */
export function usePartnersFilterSync() {
  const searchParams = useSearchParams();
  const { search, filters, initialized, initFilters } = useFiltersStore();

  /**
   * Initialize state from query params on first render
   */
  useEffect(() => {
    if (initialized) return;
    initFilters(searchParams);
  }, [initialized, initFilters, searchParams]);

  /**
   * Update query params when filters change
   */
  useEffect(() => {
    const queryString = createQueryString({ search, filters });

    // next.js router push state reloads page, so we use history.pushState to avoid extra requests
    window.history.pushState({}, '', '?' + queryString);
  }, [search, filters]);
}
