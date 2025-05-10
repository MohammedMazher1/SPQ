'use client';
import React, { useMemo } from 'react';
import type { Order } from '@/types'; // Updated to Order and related types
import type { ColumnDef } from '@tanstack/react-table';
import DefaultTable from '@/components/tables/default-table';
import SkeletonTable from '@/components/tables/skeleton-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/elements/searchBar';
import DeleteDialog from '@/components/elements/deleteDialog';
// Image might not be needed directly for orders unless displaying user avatars or product images in summary
// import { useDebouncedCallback } from 'use-debounce';

// This Response type should ideally come from wherever the data fetching logic is
// For now, we adapt it based on the Order type

const DataTable = ({ page }: { page?: string }) => {
  // Renamed page to currentPage for clarity
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const debouncedSearchQuery = useDebouncedCallback((query: string) => {
  //   setSearchQuery(query);
  // }, 500);

  const handleSearch = (query: string) => {
    // debouncedSearchQuery(query);
    console.log('Search query:', query);
    console.log('Search query:', page);
  };

  const router = useRouter();

  // TODO: The actual data fetching (e.g., using React Query) would go here,
  // using `currentPage` and `searchQuery`.
  // For this example, we'll assume `data` is passed or fetched.
  // const { data: response, isLoading, isError } = useQuery<OrdersResponse>(...);

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'رقم الطلب', // Order ID
        cell: ({ row }) =>
          // Display actual order ID if available and preferred, or keep row index
          // For now, using actual order ID
          row.original.id.toString(),
      },
      {
        accessorKey: 'user.name', // Accessing nested property
        header: 'اسم العميل', // Customer Name
        cell: ({ row }) => {
          return <span>{row.original.user?.name || 'N/A'}</span>;
        },
      },
      {
        accessorKey: 'orderDate',
        header: 'تاريخ الطلب', // Order Date
        cell: ({ row }) => {
          return (
            <span>
              {new Date(row.original.orderDate).toLocaleDateString('ar-EG')}
            </span>
          ); // Basic date formatting
        },
      },
      {
        accessorKey: 'totalAmount',
        header: 'المبلغ الإجمالي', // Total Amount
        cell: ({ row }) => {
          // Assuming formattedPrice includes currency or use totalAmount and format here
          return (
            <span>
              {row.original.formattedPrice || row.original.totalAmount}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'حالة الطلب', // Order Status
        cell: ({ row }) => {
          // Potentially add styling based on status
          return <span>{row.original.status}</span>;
        },
      },
      {
        accessorKey: 'items',
        header: 'عدد المنتجات', // Number of Items
        cell: ({ row }) => {
          return <span>{row.original.items?.length || 0}</span>;
        },
      },
      {
        id: 'actions', // Changed accessorKey to id for actions column
        header: 'إجراءات', // Actions
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/orders/${row.original.id}`)}
              >
                عرض
              </Button>
              <DeleteDialog
                title="حذف الطلب"
                description="هل أنت متأكد من حذف هذا الطلب؟"
                url={`/api/orders/${row.original.id}`} // Assuming API endpoint for deletion
                keys={['orders']} // React Query key to refetch/invalidate
              />
            </div>
          );
        },
      },
    ],
    [router], // Added router to dependency array as it's used in actions
  );

  // Placeholder for actual data and loading state
  const isLoading = false; // Replace with actual loading state from data fetching
  const responseData: Order[] = []; // Replace with actual data from response
  const totalRecords = 0; // Replace with actual total from response

  return (
    <section>
      <div className="flex items-center justify-between py-2">
        <SearchBar onSearch={query => handleSearch(query)} />
        <Link href="/orders/add">
          <Button>إضافة طلب</Button>
        </Link>
      </div>
      {isLoading ? (
        <SkeletonTable columns={columns} />
      ) : (
        <DefaultTable
          columns={columns}
          data={responseData} // Use actual fetched data
          pageSize={10} // This should ideally come from response or be a constant
          total={totalRecords} // Use actual total records
          onRowClick={(_, row) => {
            // Keeping direct navigation to view page on row click for now
            // Alternatively, this could be handled exclusively by the "View" button
            router.push(`/orders/${row.original.id}`);
          }}
        />
      )}
    </section>
  );
};

export default DataTable;
