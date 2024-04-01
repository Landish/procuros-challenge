import { XMarkIcon } from '@heroicons/react/16/solid';

interface BadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function Badge({ label, value, onRemove }: BadgeProps) {
  return (
    <span className="flex h-5 items-center rounded-full border border-gray-200 bg-gray-100 p-0.5 pl-2 text-xs leading-4 text-gray-800">
      <span className="space-x-1 truncate">
        <span className="capitalize">{label}</span>:<span>{value}</span>
      </span>
      <button onClick={onRemove} className="hover:text-red-600">
        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </span>
  );
}
