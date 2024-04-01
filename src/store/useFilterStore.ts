import { create } from 'zustand';

type AvailableFilters = 'status' | 'category' | string;

interface FiltersState {
  initialized: boolean;
  search: string;
  filters: Record<AvailableFilters, string[]>;
}

interface FiltersActions {
  setSearch: (query: string) => void;
  initFilters: (params: Pick<FiltersState, 'search' | 'filters'>) => void;
  setFilter: (name: AvailableFilters, value: string[]) => void;
  removeFromFilter: (name: AvailableFilters, value: string) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState & FiltersActions>((set) => ({
  initialized: false,
  search: '',
  filters: {},
  setSearch: (query) => set((state) => ({ ...state, search: query })),
  initFilters: ({ search, filters }) => {
    set({
      initialized: true,
      search,
      filters,
    });
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
      filters: {},
    }),
}));
