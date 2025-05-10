'use client';
import React, { useEffect, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateGovernorate } from '@/lib/api/governorates/useGovernorates';

const formSchema = z.object({
  name: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
const CreateGovernorate = () => {
  const closeDialog = useRef<HTMLButtonElement>(null);
  const { mutate, isPending, isSuccess } = useCreateGovernorate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      closeDialog.current?.click();
    }
  }, [isSuccess]);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-primary">إضافة محافظة</h1>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => mutate(data.name))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="اسم المحافظة"
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

export default CreateGovernorate;
