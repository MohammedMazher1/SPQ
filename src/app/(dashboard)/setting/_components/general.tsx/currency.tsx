import React, { useMemo } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import DeleteDialog from '@/components/elements/deleteDialog';
import { useGetCurrency } from '@/lib/api/currency/useCurrency';
import EditDialog from '../../_components/dialog';
import type { ColumnDef } from '@tanstack/react-table';
import SettingTable from '@/components/tables/setting-table';
import { Currency } from '@/types';

const Currencies = () => {
  const { data: currencies, isPending } = useGetCurrency();
  const columns = useMemo<ColumnDef<Currency>[]>(
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
        header: 'اسم العملة',
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
              title="هل أنت متأكد من حذف هذه العملة"
              description="سيتم حذف العملة بشكل نهائي ولا يمكن التراجع عن هذا الإجراء."
              url={'/currency/' + row.original?.id}
              keys={['currencies']}
            />
            <EditDialog
              triggerLabel={<Pencil className="h-4 w-4" />}
              dialogContent={<div>edit</div>}
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
          <SettingTable columns={columns} data={currencies || []} />
        </div>
      )}
    </div>
  );
};

export default Currencies;
