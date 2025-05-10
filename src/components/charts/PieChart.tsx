'use client';
import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { OrderStats } from '@/types';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function Component({
  Rejected,
  Preparing,
  Delivered,
}: OrderStats) {
  const chartData = [
    { browser: 'الطلبات المنجزة', visitors: Delivered, fill: '#22C55E' },
    { browser: 'قيد التنفيذ', visitors: Preparing, fill: '#F59E0B' },
    { browser: 'المرفوضة', visitors: Rejected, fill: '#EF4444' },
  ];
  return (
    <Card className="m-0 flex w-full flex-col border-none p-0 shadow-none">
      <CardHeader>
        <div className="mt-4 flex justify-center gap-4">
          {chartData.map((data, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: data.fill }}
              />
              <span className="text-[12px]">{data.browser}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={[{ name: 'Background', value: 45, fill: '#E5E7EB' }]}
              dataKey="value"
              innerRadius={30}
              strokeWidth={5}
              isAnimationActive={false}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={45}
              strokeWidth={5}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
