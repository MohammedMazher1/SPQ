import React from 'react';
import { Loader2, Pencil } from 'lucide-react';
import DeleteDialog from '@/components/elements/deleteDialog';
import { cn } from '@/lib/utils';
import { useGetGovernorates } from '@/lib/api/governorates/useGovernorates';
import EditDialog from '../../_components/dialog';
import EditForm from './forms/edit/createGovernorate';
const Governorates = () => {
  const { data: governorates, isPending } = useGetGovernorates();
  return (
    <div className="space-y-2 py-2">
      {isPending ? (
        <Loader2 className="m-auto animate-spin" size={30} />
      ) : (
        governorates?.map((gov, index) => (
          <div
            key={gov.id}
            className={cn(
              'group flex items-center justify-between rounded p-2 hover:bg-muted',
              index % 2 === 0 && 'bg-[#F8F9FF]',
            )}
          >
            <h1 className="text-base font-medium">
              {index + 1}. {gov.name}
            </h1>
            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              {/* delete dialog */}
              <DeleteDialog
                title="هل أنت متأكد من حذف هذه المحافظة"
                description="سيتم حذف المحافظة بشكل نهائي ولا يمكن التراجع عن هذا الإجراء."
                url={'/governorates/' + gov.id}
                keys={['governorates']}
              />
              <EditDialog
                triggerLabel={<Pencil className="h-4 w-4" />}
                dialogContent={<EditForm id={gov.id!} />}
                className="min-w-7 cursor-pointer"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Governorates;
