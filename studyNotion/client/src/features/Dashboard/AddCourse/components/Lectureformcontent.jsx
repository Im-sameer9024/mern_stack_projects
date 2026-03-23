// components/CourseBuilder/LectureForm/LectureFormContent.jsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import LectureVideoUpload from './LectureVideoUpload';

// ── Zod schema ─────────────────────────────────────────────────────────────
const lectureSchema =(isEdit) => z.object({
   file: isEdit
      ? z.any().optional()
      : z.any().refine((f) => f !== null && f !== undefined, {
          message: 'Please upload a lecture video or image',
        }),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

// ── shared form body (used for both create & edit) ─────────────────────────
const LectureFormContent = ({ mode = 'create', defaultValues, onSubmit, onCancel, isLoading }) => {
  
  const isEdit = mode === 'edit';
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lectureSchema(isEdit)),
    defaultValues: defaultValues ?? {
      file: null,
      title: '',
      description: '',
    },
  });


  return (
    <>
      {/* ── Modal header ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          {isEdit ? 'Editing Lecture' : 'Add Lecture'}
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
        {/* Video Upload */}
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <LectureVideoUpload
              value={field.value}
              onChange={field.onChange}
              error={errors.file?.message}
            />
          )}
        />

        {/* Lecture Title */}
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
            className="px-5 py-2.5 rounded-md text-sm font-medium
                       bg-richBlack-700 border border-richBlack-500
                       text-richBlack-200 hover:text-white hover:border-richBlack-400
                       transition-colors"
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
            {isEdit ? 'Save Edits' : 'Create Lecture'}
          </button>
        </div>
      </form>
    </>
  );
};

export default LectureFormContent;
