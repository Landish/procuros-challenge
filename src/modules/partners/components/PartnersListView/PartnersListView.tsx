'use client';
import { Suspense } from 'react';
import { PartnersDataTable, PartnersFilterBar } from '@/modules/partners';
import { AppProvider } from '@/providers';

export function PartnersListView() {
  return (
    <AppProvider>
      <div className="divide-y divide-gray-200">
        <div className="px-8 py-4">
          <div>
            <h1 className="text-2xl font-extrabold text-black">
              Procuros Network
            </h1>
            <h2 className="text-sm font-normal text-gray-500">
              Find all available partners in our platform and request new
              connections
            </h2>
          </div>

          <Suspense>
            <PartnersFilterBar />
          </Suspense>
        </div>
        <div className="px-8 py-4">
          <PartnersDataTable />
        </div>
      </div>
    </AppProvider>
  );
}
