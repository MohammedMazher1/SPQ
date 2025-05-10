'use client';
import React, { useEffect, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateDirectorate } from '@/lib/api/directorates/useDirectorates';
import { useGetGovernorates } from '@/lib/api/governorates/useGovernorates';
import { useGetDirectorateById } from '@/lib/api/directorates/useDirectorates';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string(),
  governorateId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
const CreateDirectorate = ({ id }: { id: number }) => {
  const closeDialog = useRef<HTMLButtonElement>(null);
  const { data: directorate } = useGetDirectorateById(id);
  const { mutate, isPending, isSuccess } = useUpdateDirectorate();
  const { data: governorates, isPending: isPendingGovernorates } =
    useGetGovernorates();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: directorate?.name || '',
      governorateId: directorate?.governorateId.toString() || '',
    },
  });
  useEffect(() => {
    form.setValue('name', directorate?.name || '');
    form.setValue('governorateId', directorate?.governorateId.toString() || '');
  }, [directorate, form]);

  useEffect(() => {
    if (isSuccess) {
      closeDialog.current?.click();
    }
  }, [isSuccess]);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-primary">تعديل مديرية</h1>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data =>
            mutate({
              name: data.name,
              governorateId: data.governorateId,
              id: id,
            }),
          )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="governorateId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent>
                      {isPendingGovernorates ? (
                        <Loader2 />
                      ) : (
                        governorates?.map(governorate => (
                          <SelectItem
                            key={governorate.id}
                            value={governorate.id.toString()}
                          >
                            {governorate.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="اسم مديرية"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <div className="flex justify-start gap-3">
              <DialogClose ref={closeDialog}>
                <div className="flex h-10 min-w-32 cursor-pointer items-center justify-center rounded-md border border-primary">
                  إلغاء
                </div>
              </DialogClose>
              <Button
                type="submit"
                isLoading={isPending}
                className="min-w-32 bg-primary py-2"
              >
                حفظ
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default CreateDirectorate;
