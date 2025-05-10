// components/OrderStatisticsChart.jsx
'use client';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Stats } from '@/types';

const Component = ({ ordersByWeekday }: Pick<Stats, 'ordersByWeekday'>) => {
  // Updated chart data with translated categories
  const chartData = [
    { category: 'الجمعة', value: ordersByWeekday?.الجمعة },
    { category: 'الخميس', value: ordersByWeekday?.الخميس },
    { category: 'الأربعاء', value: ordersByWeekday?.الأربعاء },
    { category: 'الثلاثاء', value: ordersByWeekday?.الثلاثاء },
    { category: 'الإثنين', value: ordersByWeekday?.الإثنين },
    { category: 'الأحد', value: ordersByWeekday?.الأحد },
    { category: 'السبت', value: ordersByWeekday?.السبت },
  ];

  const chartConfig = {
    value: {
      label: 'orders',
      color: 'red',
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={500} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {/* if locale == ar make the <YAxis /> in the right  and if locale = en  make it in left of bars */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              orientation="right"
              domain={[0, 50]}
            />
            <Tooltip formatter={value => value} />
            <Legend />
            <Bar
              background={true}
              dataKey="value"
              // datakey lable
              name="الطلبات"
              fill="#033B37"
              radius={8}
              barSize={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Component;
