import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  icon?: React.ReactNode;
}

export function Input({ icon, ...props }: InputProps) {
  return (
    <div className="relative rounded-md shadow-sm">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        className="block h-9 w-full rounded-md border-0 py-1.5 pl-10 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
        {...props}
      />
    </div>
  );
}
