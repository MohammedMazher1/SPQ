import React, { useMemo } from 'react';
import { Pencil } from 'lucide-react';
import DeleteDialog from '@/components/elements/deleteDialog';
import type { ColumnDef } from '@tanstack/react-table';
import SettingTable from '@/components/tables/setting-table';
import { Size } from '@/types';
import EditDialog from '../../_components/dialog';

const Sizes = () => {
  const columns = useMemo<ColumnDef<Size>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => (
          <div className="text-right">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'الحجم',
      },
      {
        accessorKey: 'code',
        header: 'الرمز',
      },
      {
        id: 'actions',
        header: 'الإجراءات',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DeleteDialog
              title="هل أنت متأكد من حذف هذا الحجم"
              description="سيتم حذف الحجم بشكل نهائي ولا يمكن التراجع عن هذا الإجراء."
              url={'/size/' + row.original?.id}
              keys={['sizes']}
            />

            {row.original && row.original.id ? (
              <EditDialog
                triggerLabel={<Pencil className="h-4 w-4" />}
                dialogContent={<div>edit</div>}
                className="min-w-7 cursor-pointer"
              />
            ) : null}
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className="space-y-2 py-2">
      <div className="space-y-2 py-2">
        <SettingTable columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default Sizes;
