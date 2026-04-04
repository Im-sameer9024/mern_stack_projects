// src/shared/components/skeletons/BarChartSkeleton.tsx

import { Skeleton } from '@/shared/components/ui/skeleton';

const BarChartSkeleton = () => {
  return (
    <div className="bg-white mt-6 p-4 rounded space-y-4">
      {/* 🔽 Year Select Skeleton */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* 📊 Chart Area */}
      <div className="h-75 w-full flex items-end justify-between gap-2 px-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2 w-full">
            {/* Bar */}
            <Skeleton className={`w-6 rounded-t-md ${index === 3 ? 'h-40' : 'h-20'}`} />

            {/* Month label */}
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartSkeleton;
