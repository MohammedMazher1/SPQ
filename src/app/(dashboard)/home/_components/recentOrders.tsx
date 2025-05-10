import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentOrders = () => {
  return (
    <div className="md:col-span-1 lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>آخر الطلبات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4"></CardContent>
      </Card>
    </div>
  );
};

export default RecentOrders;
