import React, { useMemo } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import DeleteDialog from '@/components/elements/deleteDialog';
import { useGetDirectorates } from '@/lib/api/directorates/useDirectorates';
import EditDialog from '../../_components/dialog';
import EditForm from './forms/edit/createDirectorate';
import type { ColumnDef } from '@tanstack/react-table';
import SettingTable from '@/components/tables/setting-table';
import { Directorate } from '@/types';

const Directorates = () => {
  const { data: directorates, isPending } = useGetDirectorates();
  const columns = useMemo<ColumnDef<Directorate>[]>(
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
        header: 'المديرية',
      },
      {
        accessorKey: 'governorate.name',
        header: 'المحافظة',
        cell: ({ row }) => <span>{row.original.governorate?.name}</span>,
      },
      {
        id: 'actions',
        header: 'الإجراءات',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DeleteDialog
              title="هل أنت متأكد من حذف هذه المديرية"
              description="سيتم حذف المديرية بشكل نهائي ولا يمكن التراجع عن هذا الإجراء."
              url={'/directorates/' + row.original?.id}
              keys={['directorates']}
            />
            <EditDialog
              triggerLabel={<Pencil className="h-4 w-4" />}
              dialogContent={<EditForm id={row.original?.id} />}
              className="min-w-7 cursor-pointer"
            />
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className="space-y-2 py-2">
      {isPending ? (
        <Loader2 className="m-auto animate-spin" size={20} />
      ) : (
        <div className="space-y-2 py-2">
          <SettingTable columns={columns} data={directorates || []} />
        </div>
      )}
    </div>
  );
};

export default Directorates;
