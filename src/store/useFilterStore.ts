import { createObjectFromQueryString } from '@/utils';

import { create } from 'zustand';

type AvailableFilters = 'status' | 'category' | string;

interface FiltersState {
  initialized: boolean;
  search: string;
  filters: Record<AvailableFilters, string[]>;
}

interface FiltersActions {
  setSearch: (query: string) => void;
  initFilters: (searchParams: URLSearchParams) => void;
  setFilter: (name: AvailableFilters, value: string[]) => void;
  removeFromFilter: (name: AvailableFilters, value: string) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
  initialized: false,
  search: '',
  filters: {
    status: [],
    category: [],
  },
  // Actions
  setSearch: (query) => set((state) => ({ ...state, search: query })),
  initFilters: (searchParams) => {
    const { search, filters } = createObjectFromQueryString(searchParams);
    set({ initialized: true, search, filters });
  },
  setFilter: (name, value) =>
    set((state) => ({
      ...state,
      filters: { ...state.filters, [name]: value },
    })),
  removeFromFilter: (name, value) => {
    set((state) => {
      const current = state.filters?.[name];
      if (!current) return state;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: current.filter((v) => v !== value),
        },
      };
    });
  },
  reset: () =>
    set({
      initialized: true,
      search: '',
      filters: {
        status: [],
        category: [],
      },
    }),
}));
