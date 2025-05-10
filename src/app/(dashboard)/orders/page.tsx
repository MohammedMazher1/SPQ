import React from 'react';
import StatisticsCard from '@/components/elements/statistics-card';
import { PieChart, Star } from 'lucide-react';
import TableData from './_components/data-table';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) => {
  const { page } = await searchParams;
  return (
    <section>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <StatisticsCard
          info={{
            label: 'عدد الطلبات',
            numbers: 50,
            icon: <PieChart />,
          }}
        />
        <StatisticsCard
          info={{
            label: 'الأعلى تقييمًا',
            numbers: 40,
            icon: <Star />,
          }}
        />
        <StatisticsCard
          info={{
            label: 'الأقل تقييمًا',
            numbers: 30,
            icon: <Star />,
          }}
        />
      </div>
      <TableData page={page} />
    </section>
  );
};

export default page;
