'use client';
import React, { useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from '@/components/elements/image-uploader';

const formSchema = z.object({
  categoryName: z.string(),
  description: z.string(),
  logo: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;
const SubCategoriesForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  // useRef to close the dialog
  const closeDialog = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-primary">إضافة فئة</h1>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => console.log(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="logo"
            render={() => (
              <FormItem className="w-full sm:w-full lg:max-w-lg">
                <FormControl>
                  <FileUploader
                    onChange={file => {
                      if (file) {
                        form.setValue('logo', file);
                      }
                    }}
                    className="h-24 w-full bg-[#F4F5FA]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="الاسم"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="الوصف"
                    className="resize-none"
                    {...field}
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

export default SubCategoriesForm;
