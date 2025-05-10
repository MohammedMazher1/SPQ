import React from 'react';
import { Card, CardContent } from '../ui/card';

interface Props {
  info: Info;
}

type Info = {
  label: string;
  numbers?: number | undefined;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
};
export default function StatisticsCard({ info }: Props) {
  return (
    <Card
      className={`cursor-pointer overflow-hidden ${info.className} hover:bg-gray-100`}
    >
      <CardContent className="p-2">
        <div className="flex flex-col items-start gap-1 space-x-2">
          <div className={`rounded-md bg-primary/10 p-2 ${info.iconClassName}`}>
            {info.icon}
          </div>
          <div>
            <h3 className="text-text-tertiary-600 mb-2 text-sm font-medium opacity-50">
              {info.label}
            </h3>
            <p className="text-text-primary-900 text-xl font-semibold">
              {info.numbers}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
