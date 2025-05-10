import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '../pagination';
import { useSearchParams } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';

function Skeleton({ className }: { className?: string }) {
  return <div className={`h-6 rounded bg-[#F2F4F7] ${className}`} />;
}
interface SkeletonTableProps<T> {
  columns: ColumnDef<T>[]; // Update to use ColumnDef<T>
}

// Update the function to destructure columns from props
export default function SkeletonTable<T>({ columns }: SkeletonTableProps<T>) {
  const currentPage = useSearchParams()?.get('page');

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns?.map((column, index) => (
              <TableHead key={index}>
                {typeof column.header === 'string' ? column.header : ''}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              {columns.map((column, index) => (
                <TableCell key={String(column.id || index)}>
                  <Skeleton className="w-24" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-60">
        <Pagination totalPages={3} currentPage={Number(currentPage)} />
      </div>
    </div>
  );
}
