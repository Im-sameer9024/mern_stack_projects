// components/shared/CourseCard/CourseCard.jsx
import { useNavigate } from 'react-router-dom';
import { Star, Users, BookOpen } from 'lucide-react';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

// Backend stores tag as ['["python","web"]'] — JSON string inside an array
const parseTags = (tag) => {
  try {
    const raw = tag?.[0];
    return raw ? JSON.parse(raw) : [];
  } catch {
    return tag ?? [];
  }
};

const CourseCard = ({ course, onClick, width = 'w-64' }) => {
  const navigate = useNavigate();

  const tags = parseTags(course.tag);
  const enrolledCount = course.studentsEnrolled?.length ?? 0;
  const reviewCount = course.ratingAndReviews?.length ?? 0;

  const handleClick = onClick ?? (() => navigate(`/course/${course._id}`));

  return (
    <div
      onClick={handleClick}
      className={`group shrink-0 ${width} bg-richBlack-800 border border-richBlack-600
                  rounded-xl overflow-hidden cursor-pointer
                  hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/5
                  transition-all duration-300`}
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-36 bg-richBlack-700 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={32} className="text-richBlack-500" />
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4 space-y-3">
        <h3
          className="text-sm font-semibold text-white leading-snug line-clamp-2
                       group-hover:text-yellow-400 transition-colors"
        >
          {course.title}
        </h3>

        <p className="text-xs text-richBlack-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full
                           bg-richBlack-600 text-richBlack-300 border border-richBlack-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-1 border-t border-richBlack-600">
          <div className="flex items-center gap-3 text-xs text-richBlack-400">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {enrolledCount}
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} className="text-yellow-400" />
              {reviewCount}
            </span>
          </div>
          <span className="text-sm font-bold text-yellow-400">{formatPrice(course.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
