'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CircleArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AddProductForm() {
  const route = useRouter();
  return (
    <div className="container mx-auto space-y-4 bg-white p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CircleArrowRight
            onClick={() => route.back()}
            className="cursor-pointer"
          />
          <h1 className="font-bold text-primary">عرض الطلب </h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/orders`}>
            <Button variant={'outline'} className="w-20">
              تعديل
            </Button>
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}
