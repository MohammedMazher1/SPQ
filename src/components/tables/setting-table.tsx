'use client';
import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
  Row,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<TData>,
  ) => void;
}
export default function SettingTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: Props<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const onRowClickHandler = React.useCallback(
    (
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
      row: Row<TData>,
    ) => {
      const target = event.target as HTMLElement;
      if (target.closest('td') && onRowClick) {
        onRowClick(event, row);
      }
    },
    [onRowClick],
  );

  return (
    <div className="mt-4 h-full space-y-4">
      <div className="flex h-full flex-col justify-between rounded-[12px] border shadow-sm">
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'text-nowrap !px-6 py-3 text-right font-bold text-primary',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={e => onRowClickHandler(e, row)}
                    className={cn(
                      'odd:bg-[#f4f4f4] even:bg-white odd:hover:bg-[#f4f4f4] even:hover:bg-white dark:odd:bg-[#f4f4f4]/50 dark:even:bg-background/0',
                      {
                        'cursor-pointer': onRowClick,
                      },
                    )}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="!px-6 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
