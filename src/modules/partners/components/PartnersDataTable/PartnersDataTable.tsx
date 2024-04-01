import { Table } from '@/components';
import { usePartnersQuery } from '@/modules/partners';

export function PartnersDataTable() {
  const { data, isLoading, isError } = usePartnersQuery();

  return (
    <div>
      {isError && (
        <div className="py-3 text-sm font-semibold">Partners not found</div>
      )}
      {isLoading && (
        <div className="py-3 text-sm font-semibold">Loading...</div>
      )}
      {data && (
        <Table
          columns={['Trade Partner', 'Status', 'Category']}
          data={data}
          renderRow={(partner) => (
            <tr key={partner.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {partner.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {partner.status}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {partner.category}
              </td>
            </tr>
          )}
        />
      )}
    </div>
  );
}
