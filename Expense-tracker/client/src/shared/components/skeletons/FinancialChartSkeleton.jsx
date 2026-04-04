import React from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';

const FinancialChartSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-4">
      {/* 🔵 Donut Chart */}
      <div className="relative flex items-center justify-center">
        {/* Outer Circle */}
        <Skeleton className="w-55 h-55 rounded-full" />

        {/* Inner Cut (donut hole) */}
        <div className="absolute flex items-center justify-center">
          <div className="w-42 h-42 rounded-full bg-white" />
        </div>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* 🔻 Legend */}
      <div className="flex items-center gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialChartSkeleton;
