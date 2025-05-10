import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const previousPageURL = currentPage === 1 ? 1 : currentPage - 1;

  const nextPageURL = currentPage === totalPages ? totalPages : currentPage + 1;
  return (
    <nav
      className="flex items-center justify-between space-x-2"
      aria-label="Pagination"
    >
      <Link
        href={createPageURL(previousPageURL)}
        className={`flex items-center gap-x-2 rounded-md border px-3 py-2 text-sm font-medium ${
          currentPage === 1
            ? 'cursor-not-allowed text-gray-300'
            : 'text-[#344054]'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ArrowLeftIcon size={14} className="rotate-180" />
        <span>السابق</span>
      </Link>
      <div>
        {[...Array(totalPages)].map((_, i) => (
          <Link
            dir="rtl"
            key={i + 1}
            href={createPageURL(i + 1)}
            className={`rounded-full px-3 py-2 text-sm font-medium ${
              currentPage === i + 1
                ? 'bg-[#e0e1e2] text-gray-700'
                : 'text-gray-700 hover:bg-[#e0e1e2]'
            }`}
            aria-current={currentPage === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <Link
        href={createPageURL(nextPageURL)}
        className={`flex items-center gap-x-2 rounded-md border px-3 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-300'
            : 'text-[#344054]'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <span>التالي</span>
        <ArrowRightIcon size={14} className="rotate-180" />
      </Link>
    </nav>
  );
}
