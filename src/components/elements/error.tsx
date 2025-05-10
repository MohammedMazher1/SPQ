import React from 'react';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  message: string;
  reset: () => void;
  className?: string;
};

const ErrorComponent = ({ message, reset, className }: Props) => {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-center gap-2 overflow-hidden px-6',
        className,
      )}
    >
      {/* Background 404 */}
      <div className="pointer-events-none select-none">
        <Image src="/image/error.png" alt="404" width={400} height={400} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          حدث خطأ غير متوقع
        </h1>
        <p className="mb-8 text-center text-muted-foreground">{message}</p>
        <div className="flex flex-row gap-3">
          <Button onClick={() => reset()} className="min-w-[120px]">
            <RefreshCcw className="me-1" size={16} />
            أعد المحاولة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
