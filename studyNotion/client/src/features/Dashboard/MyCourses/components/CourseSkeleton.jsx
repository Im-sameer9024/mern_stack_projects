import { Skeleton } from '@/components/ui/skeleton'; // ✅ shadcn Skeleton

const CourseSkeleton = () => (
  <div className="border border-richBlack-600 rounded-lg overflow-hidden">
    {/* Header bar */}
    <div className="flex items-center gap-5 px-6 py-3 bg-richBlack-700/60 border-b border-richBlack-600">
      <Skeleton className="h-3 w-24 bg-richBlack-600" />
      <div className="flex-1" />
      <Skeleton className="h-3 w-12 bg-richBlack-600 hidden md:block" />
      <Skeleton className="h-3 w-16 bg-richBlack-600" />
    </div>

    {/* 3 skeleton rows */}
    <div className="px-6 bg-richBlack-800 divide-y divide-richBlack-600">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-5 py-6">
          {/* Thumbnail */}
          <Skeleton className="w-42.5 h-27.5 rounded-md bg-richBlack-600 shrink-0" />

          {/* Text lines */}
          <div className="flex-1 space-y-2.5 pt-1">
            <Skeleton className="h-4 w-1/3 bg-richBlack-600 rounded" />
            <Skeleton className="h-3 w-3/4 bg-richBlack-600 rounded" />
            <Skeleton className="h-3 w-1/2 bg-richBlack-600 rounded" />
            <Skeleton className="h-5 w-20 bg-richBlack-600 rounded-full" />
          </div>

          {/* Price */}
          <Skeleton className="w-16 h-4 bg-richBlack-600 rounded hidden md:block" />

          {/* Action icons */}
          <div className="flex gap-3">
            <Skeleton className="w-4 h-4 bg-richBlack-600 rounded" />
            <Skeleton className="w-4 h-4 bg-richBlack-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CourseSkeleton;
