// components/CategorySkeleton.jsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CategorySkeleton = () => {
  return (
    <div className="flex gap-6 overflow-x-auto">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-2 rounded-lg justify-center items-center min-w-[150px] space-y-3"
        >
          <Skeleton className="w-20 h-20 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;