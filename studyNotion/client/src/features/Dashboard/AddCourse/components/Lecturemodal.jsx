import Modal from '@/components/custom/Modal';
import LectureFormContent from './Lectureformcontent';

const LectureModal = ({
  isOpen,
  mode = 'create',
  lecture = null,
  sectionId,
  onClose,
  onSubmit,
  isLoading = false, // ✅ received from CourseBuilderForm
}) => {
  const defaultValues =
    mode === 'edit' && lecture
      ? {
          file: lecture.file ?? null,
          title: lecture.title ?? '',
          description: lecture.description ?? '',
        }
      : undefined;

 
  const handleSubmit = async (formData) => {
    await onSubmit(formData, sectionId, lecture?._id);
  };

  return (
    <Modal
      isVisible={isOpen}
      width="lg:w-[50%]"
      content={
        <LectureFormContent
          mode={mode}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default LectureModal;