import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { setStep } from '../courseSlice';
import { useUpdateCourseStatus } from '../hooks/useCourse';

const CoursePublish = () => {
  const dispatch = useDispatch();
  const { courseId } = useSelector((state) => state.course);

  // 'draft' | 'published' — toggles between the two
  const [status, setStatus] = useState('draft');
  const [isPending, setIsPending] = useState(false);

  const { mutate: UpdateCourseStatus } = useUpdateCourseStatus();

  const handleBack = () => {
    if (isPending) return;
    dispatch(setStep(2));
  };

  const handleSave = () => {
    if (!courseId || isPending) return;
    setIsPending(true);
    UpdateCourseStatus(
      { courseId, status },
      { onSettled: () => setIsPending(false) }
    );
  };

  const isDraft = status === 'draft';

  return (
    <div className="space-y-6">
      {/* ── Card ── */}
      <div className="bg-richBlack-800 border border-richBlack-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Publish Settings</h2>

        {/* ── Toggle ── */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-richBlack-300">Course status</p>

          <div
            className="inline-flex items-center rounded-lg border border-richBlack-600
                       bg-richBlack-700 p-1 w-fit"
          >
            {/* Draft pill */}
            <button
              type="button"
              onClick={() => setStatus('draft')}
              disabled={isPending}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200
                         disabled:cursor-not-allowed
                         ${
                           isDraft
                             ? 'bg-richBlack-500 text-white shadow-sm'
                             : 'text-richBlack-400 hover:text-richBlack-200'
                         }`}
            >
              Draft
            </button>

            {/* Published pill */}
            <button
              type="button"
              onClick={() => setStatus('published')}
              disabled={isPending}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200
                         disabled:cursor-not-allowed
                         ${
                           !isDraft
                             ? 'bg-yellow-400 text-black shadow-sm'
                             : 'text-richBlack-400 hover:text-richBlack-200'
                         }`}
            >
              Published
            </button>
          </div>

          {/* Status description */}
          <p className="text-xs text-richBlack-400">
            {isDraft
              ? 'Only you can see this course. Students cannot enroll until it is published.'
              : 'This course is visible to students and open for enrollment.'}
          </p>
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="flex items-center justify-between pt-2">
        {/* Back */}
        <button
          type="button"
          onClick={handleBack}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium
                     bg-richBlack-700 border border-richBlack-600 text-white
                     hover:bg-richBlack-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Save Status */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="px-6 py-3 rounded-md text-sm font-medium
                     bg-yellow-400 text-black hover:bg-yellow-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors flex items-center gap-2"
        >
          {isPending && <Loader2 size={15} className="animate-spin" />}
          Save Status
        </button>
      </div>
    </div>
  );
};

export default CoursePublish;