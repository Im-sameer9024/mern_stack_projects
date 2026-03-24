import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import LectureVideoUpload from './LectureVideoUpload';

// ── Zod schema ──────────────────────────────────────────────────────────────

const lectureSchema = (isEdit) =>
  z.object({
    // Edit mode: file is optional — user may keep the existing video.
    // Create mode: file is required — must upload a video.
    file: isEdit
      ? z.any().optional()
      : z.any().refine((f) => f !== null && f !== undefined, {
          message: 'Please upload a lecture video',
        }),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
  });

// ─────────────────────────────────────────────────────────────────────────────
// LectureFormContent
// ─────────────────────────────────────────────────────────────────────────────

// FIX: Removed the useEffect + reset pattern entirely.
//
// WHY IT WAS BROKEN:
// useEffect runs AFTER the first render. On that first render useForm already
// initialised with the old/empty defaultValues. Calling reset() inside useEffect
// caused a second render with correct values, but only IF the dependency array
// changed — which it didn't on subsequent opens of the same lecture because
// the memo reference was stable.
//
// THE FIX:
// Pass defaultValues directly into useForm(). This works reliably because
// Modal returns null when closed, so LectureFormContent fully UNMOUNTS.
// On the next open it REMOUNTS fresh, and useForm() reads the new defaultValues
// at construction time — no useEffect needed at all.

const LectureFormContent = ({
  mode = 'create',
  lecture,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const isEdit = mode === 'edit';

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lectureSchema(isEdit)),
    // defaultValues are set once at mount. Since the modal unmounts on close,
    // this is always fresh data when the modal re-opens.
    defaultValues: defaultValues ?? {
      file: null,
      title: '',
      description: '',
    },
  });

  return (
    <>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          {isEdit ? 'Edit Lecture' : 'Add Lecture'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="w-8 h-8 rounded-full flex items-center justify-center
                     text-richBlack-300 hover:text-white hover:bg-richBlack-600
                     transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Video upload — Controller needed because it's an uncontrolled file input */}
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <LectureVideoUpload
              value={field.value}
              onChange={field.onChange}
              error={errors.file?.message}
              lecture={lecture}
            />
          )}
        />

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white">
            Lecture Title <span className="text-red-400">*</span>
          </label>
          <input
            {...register('title')}
            placeholder="Enter Lecture Title"
            className="w-full bg-richBlack-700 border border-richBlack-500 rounded-md
                       px-4 py-2.5 text-sm text-white outline-none placeholder:text-richBlack-400
                       focus:border-yellow-400 transition-colors"
          />
          {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white">
            Lecture Description <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Enter a brief description of this lecture..."
            className="w-full bg-richBlack-700 border border-richBlack-500 rounded-md
                       px-4 py-2.5 text-sm text-white outline-none resize-none
                       placeholder:text-richBlack-400 focus:border-yellow-400 transition-colors"
          />
          {errors.description && (
            <p className="text-xs text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-md text-sm font-medium
                       bg-richBlack-700 border border-richBlack-500
                       text-richBlack-200 hover:text-white hover:border-richBlack-400
                       transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-md text-sm font-medium
                       bg-yellow-400 text-black hover:bg-yellow-300
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-2"
          >
            {isLoading && (
              <span
                className="w-4 h-4 border-2 border-black border-t-transparent
                           rounded-full animate-spin"
              />
            )}
            {isEdit ? 'Save Changes' : 'Create Lecture'}
          </button>
        </div>
      </form>
    </>
  );
};

export default LectureFormContent;
