import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

const CourseDetailHero = ({ course }) => {
  // 🔥 Safe derived values
  const reviewCount = course?.ratingAndReviews?.length ?? 0;
  const studentCount = course?.studentsEnrolled?.length ?? 0;

  const avgRating = useMemo(() => {
    if (!reviewCount) return 0;
    return course.ratingAndReviews.reduce((a, b) => a + b.rating, 0) / reviewCount;
  }, [course, reviewCount]);

  const instructorName = course?.instructor
    ? `${course.instructor.firstName} ${course.instructor.lastName}`
    : 'Unknown Instructor';

  const createdDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <div className="space-y-5">
      {/* ── Title ── */}
      <h1 className="text-3xl font-bold">{course.title}</h1>

      {/* ── Description ── */}
      <p className="text-gray-400 max-w-2xl">{course.description}</p>

      {/* ── Rating + Students ── */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-yellow-400 font-semibold">{avgRating.toFixed(1)}</span>

        <span className="text-gray-400">({reviewCount} reviews)</span>

        <span className="text-gray-400">{studentCount || 0} students</span>
      </div>

      {/* ── Instructor + Date ── */}
      <div className="text-sm text-gray-300">
        Created by <span className="text-white font-medium">{instructorName}</span> • {createdDate}
      </div>

      {/* ── Tags / Category ── */}
      {course?.tag?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {course.tag.map((tag, i) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* ── Instructions ── */}
      {course?.instructions?.length > 0 && (
        <div className="bg-richBlack-800 border border-richBlack-600 rounded-lg p-4 space-y-2">
          <h2 className="text-sm font-semibold text-white">Instructions</h2>

          <ul className="space-y-1">
            {course.instructions.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-yellow-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetailHero;
