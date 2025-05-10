import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

const CardItem = ({
  title,
  statistics,
  icon,
}: {
  title: string;
  statistics: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="rounded-lg">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          {/* Right side: background circle with your passed-in icon */}
          <div className="rounded-full bg-primary/5 p-2">{icon}</div>
          {/* Left side: "هذا الأسبوع" + optional chevron icon */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <p>هذا الأسبوع</p>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Bottom section: title + statistics */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{statistics}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
