'use client';
import { Badge } from '@/components';
import { getPartnerCategories, getPartnerStatuses } from '@/modules/partners';
import { useFiltersStore } from '@/store';

export function PartnersFilterBarSettings() {
  const { filters, removeFromFilter, reset } = useFiltersStore();
  const hasSelectedFilters = Object.values(filters).some((v) => v.length > 0);

  if (!hasSelectedFilters) return null;

  return (
    <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
      <div className="text-sm text-gray-500">Filtered by:</div>

      <div className="max-w-full overflow-hidden overflow-x-scroll">
        <div className="flex items-center space-x-2">
          {Object.entries(filters).map(([filterName, filterValues]) =>
            filterValues?.map((filterValue) => (
              <Badge
                key={filterValue}
                label={filterName}
                value={getFilterLabel(filterName, filterValue)}
                onRemove={() => removeFromFilter(filterName, filterValue)}
              />
            )),
          )}
        </div>
      </div>

      <button
        onClick={reset}
        className="px-3 text-xs font-medium text-gray-900 hover:text-gray-700"
      >
        Clear filters
      </button>
    </div>
  );
}

export function getFilterLabel(name: string, value: string) {
  const filtersData = {
    status: getPartnerStatuses(),
    category: getPartnerCategories(),
  };

  // @ts-ignore
  if (filtersData[name] && Array.isArray(filtersData[name])) {
    // @ts-ignore
    return filtersData[name].find((o) => o.value === value)?.label || '';
  }

  return '';
}
