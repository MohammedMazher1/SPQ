import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import General from './taps/general';
import Areas from './taps/areas';
import Backup from './taps/backup';

const tabs = [
  {
    title: 'عام',
    content: <General />,
    value: 'general',
  },
  {
    title: 'المناطق',
    content: <Areas />,
    value: 'Areas',
  },
  {
    title: 'النسخ الإحتياطي',
    content: <Backup />,
    value: 'backup',
  },
];
export default function page() {
  return (
    <div>
      <Tabs dir="rtl" defaultValue="general" className="space-y-4">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex gap-x-2"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
