// components/shared/HorizontalScrollSection/HorizontalScrollSection.jsx
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCardSkeleton from './Coursecardskeleton';
import CourseCard from './Coursecard';


const HorizontalScrollSection = ({
  title,
  subtitle,
  courses = [],
  isLoading = false,
  skeletonCount = 4,
  scrollAmount = 300,
  onCardClick,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Don't render the section at all if there's nothing to show and not loading
  if (!isLoading && !courses.length) return null;

  return (
    <section className="space-y-4">
      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="text-sm text-richBlack-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Scroll arrows — only shown when there are real cards */}
        {!isLoading && courses.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-richBlack-700 border border-richBlack-600
                         flex items-center justify-center text-richBlack-300
                         hover:bg-richBlack-600 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-richBlack-700 border border-richBlack-600
                         flex items-center justify-center text-richBlack-300
                         hover:bg-richBlack-600 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3d3d3a transparent' }}
      >
        {isLoading ? (
          <CourseCardSkeleton count={skeletonCount} />
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onClick={onCardClick ? () => onCardClick(course) : undefined}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;