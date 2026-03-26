// components/shared/CourseDetailSkeleton/CourseDetailSkeleton.jsx

const Block = ({ w = 'w-full', h = 'h-4', className = '' }) => (
  <div className={`${w} ${h} bg-richBlack-700 rounded animate-pulse ${className}`} />
);

// ─────────────────────────────────────────────────────────────────────────────
// CourseDetailSkeleton
// Matches the two-column layout of CourseDetail exactly.
// ─────────────────────────────────────────────────────────────────────────────

const CourseDetailSkeleton = () => (
  <div className="min-h-screen bg-richBlack-900">
    {/* Hero area */}
    <div className="bg-richBlack-800 border-b border-richBlack-700 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-4">
            <Block w="w-24" h="h-3" />
            <Block w="w-3/4" h="h-8" />
            <Block w="w-full" h="h-4" />
            <Block w="w-4/5" h="h-4" />
            <Block w="w-48" h="h-4" />
            <Block w="w-56" h="h-3" />
          </div>
          {/* Right card skeleton */}
          <div className="hidden lg:block">
            <div className="bg-richBlack-700 rounded-xl overflow-hidden animate-pulse">
              <div className="h-44 bg-richBlack-600" />
              <div className="p-5 space-y-3">
                <Block w="w-24" h="h-8" />
                <Block h="h-10" />
                <Block h="h-10" />
                <Block w="w-40" h="h-3" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Content area */}
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* What you'll learn */}
          <div className="border border-richBlack-700 rounded-lg p-6 space-y-3 animate-pulse">
            <Block w="w-40" h="h-5" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Block key={i} w={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
            ))}
          </div>
          {/* Accordion */}
          <div className="space-y-2 animate-pulse">
            <Block w="w-32" h="h-5" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-richBlack-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetailSkeleton;