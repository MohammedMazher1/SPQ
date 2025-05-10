import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApi } from '@/lib/http';
import { toast } from '@/hooks/use-toast';
import { revalidatePathAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  description: string;
  url?: string;
  keys?: string[];
  revalidatePath?: string;
};
const DeleteDialog = ({
  title,
  description,
  url,
  keys,
  revalidatePath,
}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteApi(`${url}`),
    onSuccess: () => {
      toast({
        title: 'تم الحذف بنجاح',
        description: 'تمت عملية الحذف بنجاح',
        variant: 'success',
      });

      if (keys) {
        queryClient.invalidateQueries({ queryKey: keys });
      }

      if (revalidatePath) {
        revalidatePathAction(revalidatePath);
      }
    },
    // on Error and display the error to user
    onError: error => {
      toast({
        title: 'حدث خطاء',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSettled: () => router.refresh(),
  });
  useEffect(() => {
    if (isPending) {
      toast({
        title: 'جاري حذف ',
        description: 'جاري عملية الحذف',
        variant: 'info',
      });
    }
  }, [isPending]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600"
          onClick={e => e.stopPropagation()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}؟</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
