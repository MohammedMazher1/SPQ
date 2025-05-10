'use client';
import ErrorComponent from '@/components/elements/error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorComponent
      className="min-h-[90%]"
      message={error.message}
      reset={reset}
    />
  );
}
