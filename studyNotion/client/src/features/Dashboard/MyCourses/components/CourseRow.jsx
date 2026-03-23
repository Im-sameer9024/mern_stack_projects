// components/MyCourses/CourseRow.jsx
import { Pencil, Trash } from 'lucide-react';
import CourseStatusBadge from './CourseStatusBadge';

const formatDate = (iso) => {
  if (!iso) return 'N/A';
  const date = new Date(iso);
  const dateStr = date.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${dateStr} | ${timeStr}`;
};

const CourseRow = ({ course, onEdit, onDelete }) => {
  const { _id, title, description, createdAt, status, thumbnail, price } = course;

  return (
    <div className="flex items-start gap-5 py-6 border-b border-richBlack-600 last:border-b-0">
      {/* Thumbnail */}
      <div className="shrink-0 w-42.4 h-27.5 rounded-md overflow-hidden bg-richBlack-700">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-30 h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-richBlack-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0  space-y-1.5">
        <h3 className="text-base font-semibold text-white leading-snug line-clamp-1">{title}</h3>
        <p className="text-sm text-richBlack-300 line-clamp-2 leading-relaxed">{description.length > 25 ? `${ description.slice(25)}...`: description}</p>
        <p className="text-xs text-richBlack-400">Created: {formatDate(createdAt)}</p>
        <CourseStatusBadge status={status} />
      </div>

      {/* Price — no duration column */}
      <div className="shrink-0 w-24 text-sm text-richBlack-200 text-center hidden md:block">
        ₹{price?.toLocaleString('en-IN') ?? '—'}
      </div>

      {/* Actions */}
      <div className="shrink-0 w-20 flex items-center justify-end gap-3 text-richBlack-300">
        <button
          onClick={() => onEdit(_id)}
          className="hover:text-yellow-400 transition-colors"
          title="Edit"
        >
          <Pencil size={17} />
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash size={17} />
        </button>
      </div>
    </div>
  );
};

export default CourseRow;
