import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
// import { Icons } from "@/components/icons" // if you have a centralized icons file

export default function WeeklyStatsCard({
  firstTitle,
  firstStatistics,
  icon,
  color,
}: {
  firstTitle: string;
  firstStatistics?: number;
  secondTitle: string;
  secondStatistics: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card
      className={cn(
        'flex flex-col justify-between gap-3 rounded-lg p-2',
        color,
        color != 'white' ? 'text-white' : '',
      )}
    >
      <div className="w-fit rounded-full bg-white/10 p-2">{icon}</div>
      <div className="flex flex-col items-start">
        <p className="mb-1 text-sm">{firstTitle}</p>
        <p className="text-2xl font-bold">{firstStatistics}</p>
      </div>
    </Card>
  );
}
