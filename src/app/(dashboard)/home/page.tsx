'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Folder } from 'lucide-react';
import PieChart from '@/components/charts/PieChart';
import WeeklyStatsCard from './_components/weeklyStatsCard';
// dynamic import
const RecentOrders = React.lazy(() => import('./_components/recentOrders'));
const BarChart = React.lazy(() => import('@/components/charts/BarChart'));
const Statistics = React.lazy(() => import('./_components/statistics'));

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-50 p-4 md:p-6">
      {/* statistics */}
      <Statistics totalOrders={50} totalFamilies={20} categoryCount={20} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* PieCharts Section */}
        <div className="grid gap-4 md:col-span-1 lg:col-span-4">
          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-0 text-center">
                <CardTitle>إحصائيات المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart Rejected={50} Preparing={25} Delivered={25} />
              </CardContent>
            </Card>
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-1">
              <WeeklyStatsCard
                firstTitle="عدد المنتجات"
                firstStatistics={30}
                secondTitle="عدد المتاجر"
                secondStatistics="32"
                icon={<Folder className="h-5 w-5" />}
                color="bg-[#033B37]"
              />
              <WeeklyStatsCard
                firstTitle="عدد العملاء"
                firstStatistics={100}
                secondTitle="معدل الشراء"
                secondStatistics="20%"
                icon={<ShoppingCart className="h-5 w-5" />}
                color="white"
              />
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <div className="w-full">
                  <h1 className="font-bold">إحصائيات المبيعات</h1>
                </div>
              </CardHeader>
              <CardContent>
                <BarChart
                  ordersByWeekday={{
                    الأحد: 5,
                    الإثنين: 10,
                    الثلاثاء: 15,
                    الأربعاء: 20,
                    الخميس: 25,
                    الجمعة: 30,
                    السبت: 35,
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Orders List */}
        <RecentOrders />
      </div>
    </div>
  );
}
