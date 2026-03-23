// components/MyCourses/CourseStatusBadge.jsx
import { CheckCircle, Clock } from 'lucide-react';

const CourseStatusBadge = ({ status }) => {
  const isPublished = status === 'published';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
        ${
          isPublished
            ? 'bg-yellow-400/15 text-yellow-400 border border-yellow-400/20'
            : 'bg-pink-500/15 text-pink-400 border border-pink-500/20'
        }`}
    >
      {isPublished ? (
        <CheckCircle size={12} className="shrink-0" />
      ) : (
        <Clock size={12} className="shrink-0" />
      )}
      {isPublished ? 'Published' : 'Drafted'}
    </span>
  );
};

export default CourseStatusBadge;
