interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow?: (row: T) => React.ReactNode;
}

export function Table<T>({
  columns = [],
  data = [],
  renderRow,
}: TableProps<T>) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {columns?.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${index == 0 ? 'sm:pl-0' : ''}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((row) => renderRow?.(row))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
