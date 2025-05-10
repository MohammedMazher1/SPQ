'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Background 404 */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <div className="text-[200px] font-bold leading-none tracking-tight text-[#F2F4F7] sm:text-[300px] md:text-[400px]">
          404
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          لم نتمكن من العثور على هذه الصفحة
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها
        </p>
        <div className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="min-w-[120px] text-[#344054]"
          >
            <ArrowRight className="me-1" size={19} />
            {'العودة للخلف'}
          </Button>
          <Button asChild className="min-w-[120px]">
            <Link href={'/home'}>العودة إلى الصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
