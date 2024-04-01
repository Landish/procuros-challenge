'use client';
import { useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { Input, Select } from '@/components';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { getPartnerCategories, getPartnerStatuses } from '@/modules/partners';
import { useFiltersStore } from '@/store';

const SEARCH_INPUT_DEBOUNCE_MS = 350;

export function PartnersFilterBarForm() {
  const { search, setSearch, filters, setFilter } = useFiltersStore();

  const changeSearchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(changeSearchHandler, SEARCH_INPUT_DEBOUNCE_MS),
    [changeSearchHandler],
  );

  const FILTER_FIELDS = [
    {
      name: 'status',
      label: 'Status',
      options: getPartnerStatuses(),
      multiple: false,
    },
    {
      name: 'category',
      label: 'Category',
      options: getPartnerCategories(),
      multiple: true,
    },
  ];

  return (
    <div className="mt-4 grid max-w-screen-sm grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="col-span-2">
        <Input
          type="search"
          key={search}
          defaultValue={search}
          onChange={debouncedChangeHandler}
          placeholder="Search 10.328 partners"
          icon={
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          }
        />
      </div>

      {FILTER_FIELDS.map(({ name, label, options, multiple }) => (
        <Select
          /**
           * We need to add the `key` prop to the Select component to force it to re-render
           */
          key={name + filters?.[name]?.toString()}
          label={label}
          value={filters?.[name]}
          options={options}
          onChange={(option) =>
            setFilter(
              name,
              Array.isArray(option)
                ? option.map((o) => o.value)
                : [option.value],
            )
          }
          multiple={multiple}
        />
      ))}
    </div>
  );
}
