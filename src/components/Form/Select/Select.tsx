'use client';

import { Fragment, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  multiple?: boolean;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: SelectOption | SelectOption[]) => void;
}

export function Select({
  label,
  multiple = false,
  options = [],
  value,
  onChange,
}: SelectProps) {
  /**
   * Get the default selected option(s) based on the `value` prop.
   */
  const defaultSelected = useMemo(() => {
    return options?.filter((option) => {
      if (Array.isArray(value)) {
        return value.includes(option.value);
      }
      return option.value === value;
    });
  }, [options, value]);

  const [selected, setSelected] = useState<SelectOption | SelectOption[]>(
    multiple ? defaultSelected : defaultSelected[0],
  );

  function handleChange(option: SelectOption | SelectOption[]) {
    setSelected(option);
    onChange?.(option);
  }

  return (
    <Listbox
      by="value"
      value={selected}
      onChange={handleChange}
      multiple={multiple}
    >
      <div className="relative">
        <Listbox.Button className="relative flex h-9 w-full cursor-default items-center space-x-2 rounded-md bg-white px-4 py-1.5 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black ui-open:ring-2 ui-open:ring-inset ui-open:ring-black">
          <span className="pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
          </span>
          <Listbox.Label className="flex-1 truncate text-sm">
            {label}
          </Listbox.Label>
          <span className="pointer-events-none">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className="relative flex cursor-default select-none items-center space-x-2 px-4 py-2 text-sm focus:outline-none"
              >
                {({ selected }) => (
                  <>
                    {multiple && (
                      <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300 text-gray-600 focus:outline-none focus:ring-0 ui-active:border-gray-900"
                        checked={selected}
                        readOnly
                      />
                    )}
                    <span className="block truncate text-gray-600 ui-active:text-gray-900">
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
