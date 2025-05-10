import React, { useMemo } from 'react';
import { Pencil } from 'lucide-react';
import DeleteDialog from '@/components/elements/deleteDialog';
import EditDialog from '../dialog';
// import { useGetBankAccounts } from '@/lib/api/bankAccount/useBankAccount';
import type { ColumnDef } from '@tanstack/react-table';
import SettingTable from '@/components/tables/setting-table';
import { BankAccount as Bank } from '@/types';

const BankAccount = () => {
  // const { data: bankAccount, isPending } = useGetBankAccounts();
  const columns = useMemo<ColumnDef<Bank>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => (
          <div className="text-right">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'bankName',
        header: 'اسم البنك',
      },
      {
        accessorKey: 'accountNumber',
        header: 'رقم الحساب',
      },
      {
        id: 'actions',
        header: 'الإجراءات',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DeleteDialog
              title="هل أنت متأكد من حذف هذا البنك"
              description="سيتم حذف البنك بشكل نهائي ولا يمكن التراجع عن هذا الإجراء."
              url={'/bankAccount/' + row.original?.id}
              keys={['bankAccounts']}
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

export default BankAccount;
