'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type OrderStatus =
  | 'Accepted'
  | 'Pending'
  | 'Preparing'
  | 'Rejected'
  | 'Delivered';
type Monthly = {
  [month: string]: {
    [status in OrderStatus]: number;
  };
};
export default function MonthlyStatisticsChart({
  statistics,
}: {
  statistics?: Monthly;
}) {
  const data = [
    {
      month: 'ديسمبر',
      annual: statistics?.ديسمبر.Accepted,
      budget: statistics?.ديسمبر.Rejected,
    },
    {
      month: 'نوفمبر',
      annual: statistics?.نوفمبر.Accepted,
      budget: statistics?.نوفمبر.Rejected,
    },
    {
      month: 'أكتوبر',
      annual: statistics?.أكتوبر.Accepted,
      budget: statistics?.أكتوبر.Rejected,
    },
    {
      month: 'سبتمبر',
      annual: statistics?.سبتمبر.Accepted,
      budget: statistics?.سبتمبر.Rejected,
    },
    {
      month: 'أغسطس',
      annual: statistics?.أغسطس.Accepted,
      budget: statistics?.أغسطس.Rejected,
    },
    {
      month: 'يوليو',
      annual: statistics?.يوليو.Accepted,
      budget: statistics?.يوليو.Rejected,
    },
    {
      month: 'يونيو',
      annual: statistics?.يونيو.Accepted,
      budget: statistics?.يونيو.Rejected,
    },
    {
      month: 'مايو',
      annual: statistics?.مايو.Accepted,
      budget: statistics?.مايو.Rejected,
    },
    {
      month: 'أبريل',
      annual: statistics?.أبريل.Accepted,
      budget: statistics?.أبريل.Rejected,
    },
    {
      month: 'مارس',
      annual: statistics?.مارس.Accepted,
      budget: statistics?.مارس.Rejected,
    },
    {
      month: 'فبراير',
      annual: statistics?.فبراير.Accepted,
      budget: statistics?.فبراير.Rejected,
    },
    {
      month: 'يناير',
      annual: statistics?.يناير.Accepted,
      budget: statistics?.يناير.Rejected,
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-5xl rounded-lg border shadow-sm">
      <CardHeader className="border-b pb-2">
        <div className="flex">
          <CardTitle className="text-xl font-semibold">
            الطلبات السنوية
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ChartContainer
            config={{
              annual: {
                label: 'الطلبات المقبولة',
                color: 'hsl(153, 47%, 20%)', // Dark green color
              },
              budget: {
                label: 'الطلبات المرفوضة',
                color: 'hsl(38, 57%, 58%)', // Gold/beige color
              },
            }}
            className="h-full w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
              barGap={5}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                domain={[0, 300]}
                ticks={[0, 50, 100, 150, 200, 250, 300]}
                // rigth side of the chart
                orientation="right"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="annual"
                fill="var(--color-annual)"
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
              />
              <Bar
                dataKey="budget"
                fill="var(--color-budget)"
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(153,47%,20%)]"></div>
            <span>الطلبات المقبولة</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(38,57%,58%)]"></div>
            <span>الطلبات المرفوضة</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
