'use client';

import {
  usePartnersFilterSync,
  PartnersFilterBarForm,
  PartnersFilterBarSettings,
} from '@/modules/partners';

export function PartnersFilterBar() {
  /**
   * Sync partners filters with query params
   */
  usePartnersFilterSync();

  return (
    <>
      <PartnersFilterBarForm />
      <PartnersFilterBarSettings />
    </>
  );
}
