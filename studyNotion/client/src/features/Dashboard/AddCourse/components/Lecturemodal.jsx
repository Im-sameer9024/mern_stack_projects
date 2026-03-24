import Modal from '@/components/custom/Modal';
import LectureFormContent from './Lectureformcontent';
import { useMemo } from 'react';

// FIX: This component is now purely a thin wrapper.
// It computes defaultValues and passes them down.
// All Redux dispatches that used to live in the parent's openEditModal/openCreateModal
// have been removed — modalState local state is the single source of truth.

const LectureModal = ({
  isOpen,
  mode = 'create',
  lecture = null,
  sectionId,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  // Compute defaultValues from the lecture prop whenever it changes.
  // useMemo ensures we only recompute when mode or lecture actually changes,
  // not on every parent re-render.
  const defaultValues = useMemo(() => {
    if (mode === 'edit' && lecture) {
      return {
        // Pass the existing Cloudinary URL as the file value.
        // LectureVideoUpload detects typeof string and shows the existing video.
        // On submit, CourseBuilderForm checks instanceof File — if it's still a
        // string (user didn't pick a new file) it won't be appended to FormData.
        file: lecture.videoUrl ?? null,
        title: lecture.title ?? '',
        description: lecture.description ?? '',
      };
    }
    // Create mode — empty defaults
    return {
      file: null,
      title: '',
      description: '',
    };
  }, [mode, lecture]);

  const handleSubmit = async (formData) => {
    await onSubmit(formData, sectionId, lecture?._id);
  };

  return (
    // IMPORTANT: Modal must unmount its content when isVisible is false
    // (return null, not CSS hide). This ensures LectureFormContent remounts
    // fresh each time the modal opens, so useForm picks up the new defaultValues.
    <Modal
      isVisible={isOpen}
      width="lg:w-[50%]"
      content={
        <LectureFormContent
          mode={mode}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          lecture={lecture}
          onCancel={onClose}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default LectureModal;
