

const CourseCardSkeleton = ({ count = 4, width = 'w-64' }) =>
  Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`shrink-0 ${width} bg-richBlack-800 border border-richBlack-700
                  rounded-xl overflow-hidden animate-pulse`}
    >
      <div className="h-36 bg-richBlack-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-richBlack-700 rounded w-4/5" />
        <div className="h-3 bg-richBlack-700 rounded w-3/5" />
        <div className="h-3 bg-richBlack-700 rounded w-2/5" />
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-richBlack-700 rounded w-16" />
          <div className="h-3 bg-richBlack-700 rounded w-12" />
        </div>
      </div>
    </div>
  ));

export default CourseCardSkeleton;