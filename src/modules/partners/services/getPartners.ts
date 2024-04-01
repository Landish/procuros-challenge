import { API_URL } from '@/constants';
import { Partner } from '@/modules/partners';
import { createQueryStringForApi } from '@/utils';

interface GetPartnersParams {
  search: string;
  filters: Record<string, string[]>;
}

export async function getPartners(
  params: GetPartnersParams,
): Promise<Partner[]> {
  const response = await fetch(
    API_URL + '/partners?' + createQueryStringForApi(params),
  );

  if (!response.ok) {
    throw new Error('Partners request failed');
  }

  return response.json();
}
