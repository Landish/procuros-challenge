import { useQuery } from '@tanstack/react-query';
import { Partner, getPartners } from '@/modules/partners';
import { useFiltersStore } from '@/store';

export function usePartnersQuery() {
  const { search, filters, initialized } = useFiltersStore();

  return useQuery<Partner[]>({
    enabled: initialized,
    queryKey: ['partners', { search, filters }],
    queryFn: async () => {
      return getPartners({ search, filters });
    },
  });
}
