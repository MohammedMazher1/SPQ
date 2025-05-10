import { Skeleton } from '@/components/ui/skeleton'; // Import the Skeleton component from shadcn/ui

const SkeletonLoader = () => {
  return (
    <div className="space-y-1">
      {/* Skeleton for the title */}
      <Skeleton className="h-6 w-1/2" />

      {/* Skeleton for the main content */}
      <div className="flex gap-2 rounded-sm bg-[#EFF1F999] p-2">
        {/* Skeleton for the icon */}
        <Skeleton className="size-[24px] rounded" />

        {/* Skeleton for the description */}
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
