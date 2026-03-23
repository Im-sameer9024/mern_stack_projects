// components/MyCourses/CourseTable.jsx
import CourseRow from './CourseRow';

// ✅ Duration removed — not available in API response
const TABLE_HEADERS = [
  { label: 'COURSES', className: 'flex-1' },
  { label: 'PRICE', className: 'w-24 text-center hidden md:block' },
  { label: 'ACTIONS', className: 'w-20 text-right' },
];

const CourseTable = ({ courses, onEdit, onDelete }) => (
  <div className="border border-richBlack-600 rounded-lg overflow-hidden">
    {/* Header */}
    <div className="flex items-center gap-5 px-6 py-3 bg-richBlack-700/60 border-b border-richBlack-600">
      {TABLE_HEADERS.map(({ label, className }) => (
        <p
          key={label}
          className={`text-xs font-semibold text-richBlack-400 tracking-widest uppercase ${className}`}
        >
          {label}
        </p>
      ))}
    </div>

    {/* Rows */}
    <div className="px-6 bg-richBlack-800">
      {courses.length === 0 ? (
        <p className="text-center text-richBlack-400 text-sm py-12">
          No courses yet. Create your first course!
        </p>
      ) : (
        courses.map((course) => (
          <CourseRow key={course._id} course={course} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  </div>
);

export default CourseTable;
