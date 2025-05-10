'use client';
import React, { useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string(),
  code: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
const SizeForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const closeDialog = useRef<HTMLButtonElement>(null);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-primary">إضافة حجم</h1>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => console.log(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="اسم الحجم"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="الرمز"
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
              <Button type="submit" className="min-w-32 bg-primary py-2">
                حفظ
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default SizeForm;
