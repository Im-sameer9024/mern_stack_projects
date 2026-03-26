// components/shared/CourseInstructor/CourseInstructor.jsx

// ─────────────────────────────────────────────────────────────────────────────
// CourseInstructor
//
// Props:
//   instructor — instructor object from API
//               { _id, firstName, lastName, email, image? }
// ─────────────────────────────────────────────────────────────────────────────

const CourseInstructor = ({ instructor }) => {
  if (!instructor) return null;

  const name = `${instructor.firstName} ${instructor.lastName}`;
  const initials = `${instructor.firstName?.[0] ?? ''}${instructor.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-white">Author</h2>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        {instructor.image ? (
          <img
            src={instructor.image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-richBlack-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400/30
                          flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-yellow-400">{initials}</span>
          </div>
        )}

        {/* Name + email */}
        <div>
          <p className="text-sm font-semibold text-white hover:text-yellow-400
                        transition-colors cursor-pointer">
            {name}
          </p>
          {instructor.email && (
            <p className="text-xs text-richBlack-400 mt-0.5">{instructor.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;