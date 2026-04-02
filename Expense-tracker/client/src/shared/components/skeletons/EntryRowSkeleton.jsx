import React from 'react';
import { Skeleton } from '../ui/skeleton';

const EntryRowSkeleton = () => {
  return (
    <div className="flex items-center justify-between w-full p-2">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <Skeleton className="h-10 w-10 rounded-full" />

        {/* Text */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* Right Section (Amount) */}
      <Skeleton className="h-4 w-16 rounded" />
    </div>
  );
};

export default EntryRowSkeleton;