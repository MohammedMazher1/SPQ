'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import type { User, Product } from '@/types'; // Assuming Product type is available

// Placeholder hooks for fetching data - replace with actual implementations
const useGetUsers = () => {
  // Replace with actual data fetching logic (e.g., React Query)
  const users: User[] = [
    // Sample data
    {
      id: 1,
      name: 'Customer A',
      email: 'a@example.com',
      phone: '123',
      password: 'asd',
      roleId: '1',
    },
    {
      id: 2,
      name: 'Customer B',
      email: 'b@example.com',
      phone: '456',
      password: 'asd',
      roleId: '1',
    },
  ];
  const isLoading = false;
  return { data: users, isLoading };
};

const useGetProducts = () => {
  // Replace with actual data fetching logic
  const products: Product[] = [
    // Sample data - ensure Product type matches your actual definition
    {
      id: 1,
      name: 'Product X',
      price: 100,
      images: [],
      description: 'Desc X',
      categoryId: '1',
      quantityAvailable: 10,
    },
    {
      id: 2,
      name: 'Product Y',
      price: 200,
      images: [],
      description: 'Desc Y',
      categoryId: '1',
      quantityAvailable: 5,
    },
  ];
  const isLoading = false;
  return { data: products, isLoading };
};

const useCreateOrder = () => {
  // Replace with actual mutation logic
  const mutate = (
    data: AddOrderFormValues,
    { onSuccess }: { onSuccess?: () => void },
  ) => {
    console.log('Creating order with:', data);
    // Simulate API call
    setTimeout(() => {
      console.log('Order created successfully');
      if (onSuccess) onSuccess();
    }, 1000);
  };
  const isLoading = false;
  return { mutate, isLoading };
};

const addOrderFormSchema = z.object({
  userId: z.string().min(1, 'الرجاء اختيار العميل'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'الرجاء اختيار المنتج'),
        quantity: z.coerce.number().min(1, 'الكمية يجب أن تكون 1 على الأقل'),
        // price: z.number(), // Price will be fetched based on product, not directly in form
      }),
    )
    .min(1, 'يجب إضافة منتج واحد على الأقل للطلب'),
  description: z.string().optional(),
});

export type AddOrderFormValues = z.infer<typeof addOrderFormSchema>;

export default function AddOrderPage() {
  const router = useRouter();
  const { data: users, isLoading: isLoadingUsers } = useGetUsers();
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();

  const form = useForm<AddOrderFormValues>({
    resolver: zodResolver(addOrderFormSchema),
    defaultValues: {
      userId: '',
      items: [{ productId: '', quantity: 1 }],
      description: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (values: AddOrderFormValues) => {
    console.log(values);
    // Transform data if needed before sending to API
    createOrder(values, {
      onSuccess: () => {
        // form.reset(); // Optionally reset form
        router.push('/orders'); // Navigate to orders list or order details page
        // Add toast notification for success
      },
    });
  };

  // Calculate total amount (display only)
  const watchItems = form.watch('items');
  const totalAmount = React.useMemo(() => {
    return watchItems.reduce((acc, currentItem) => {
      const product = products?.find(
        p => p.id.toString() === currentItem.productId,
      );
      return acc + (product ? product.price * currentItem.quantity : 0);
    }, 0);
  }, [watchItems, products]);

  return (
    <div
      className="container mx-auto space-y-6 rounded-md bg-white p-6 shadow-md"
      dir="rtl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">إنشاء طلب جديد</h1>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isCreatingOrder}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={
                  isCreatingOrder || isLoadingUsers || isLoadingProducts
                }
              >
                {isCreatingOrder ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                حفظ الطلب
              </Button>
            </div>
          </div>
          <hr />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العميل</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingUsers}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر العميل" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingUsers ? (
                          <div className="flex justify-center p-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        ) : (
                          users?.map(user => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.name} ({user.email})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>المنتجات المطلوبة</FormLabel>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="mt-2 flex items-end gap-3 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`items.${index}.productId`}
                      render={({ field: itemField }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-sm">المنتج</FormLabel>
                          <Select
                            onValueChange={itemField.onChange}
                            defaultValue={itemField.value}
                            disabled={isLoadingProducts}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المنتج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingProducts ? (
                                <div className="flex justify-center p-2">
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                              ) : (
                                products?.map(product => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}
                                  >
                                    {product.name} - {product.price} ريال
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field: itemField }) => (
                        <FormItem className="w-24">
                          <FormLabel className="text-sm">الكمية</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="الكمية"
                              {...itemField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => append({ productId: '', quantity: 1 })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> إضافة منتج آخر
                </Button>
                {form.formState.errors.items &&
                  typeof form.formState.errors.items === 'object' &&
                  !Array.isArray(form.formState.errors.items) && (
                    <p className="mt-1 text-sm font-medium text-destructive">
                      {form.formState.errors.items.message}
                    </p>
                  )}
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات على الطلب (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="أدخل أي ملاحظات إضافية هنا..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 md:col-span-1">
              <div className="rounded-md border bg-slate-50 p-4">
                <h3 className="mb-3 text-lg font-semibold">ملخص الطلب</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>عدد أنواع المنتجات:</span>
                    <span>{watchItems.length}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>المجموع الإجمالي:</span>
                    <span>{totalAmount.toLocaleString()} ريال</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
