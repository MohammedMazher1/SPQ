import StatisticsCard from '@/components/elements/statistics-card';
import { Package, ShoppingCart, Users } from 'lucide-react';
import React from 'react';
import { Stats } from '@/types';
const Statistics = ({ totalOrders, totalFamilies, categoryCount }: Stats) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatisticsCard
        info={{
          label: 'عدد الطلبات',
          numbers: totalOrders,
          icon: <ShoppingCart />,
        }}
      />
      <StatisticsCard
        info={{
          label: 'عدد المتاجر',
          numbers: totalFamilies,
          icon: <Users />,
        }}
      />
      <StatisticsCard
        info={{
          label: 'عدد الأصناف',
          numbers: categoryCount,
          icon: <Package />,
        }}
      />
    </div>
  );
};

export default Statistics;
