/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Pencil, Trash, ChevronUp, ChevronLeft, AlignLeft, Check, X, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import LectureModal from './Lecturemodal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  useCreateSection,
  useDeleteSection,
  useGetSectionsByCourse,
  useUpdateSection,
} from '../hooks/useSection';
import {
  useCreateSubSection,
  useDeleteSubSection,
  useUpdateSubSection,
} from '../hooks/useSubSection';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@/components/ui/spinner';
import {
  nextStep,
  prevStep,
  setIsEditSection,
  setIsEditSubSection,
  setSection,
  setSectionId,
  setSubSection,
  setSubSectionId,
} from '../courseSlice';

const InlineSpinner = () => (
  <Loader2 size={14} className="animate-spin text-yellow-400 shrink-0" />
);

const IconBtn = ({ onClick, children, title, disabled }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className="text-richBlack-300 hover:text-white transition-colors hover:cursor-pointer
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

const LectureRow = ({ lecture, sectionId, onDelete, onEdit, isUpdating, isDeleting }) => {
  const isBusy = isUpdating || isDeleting;
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: isBusy ? 0.6 : 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex items-center justify-between px-4 py-2.5 rounded-md
                 bg-richBlack-800 border border-richBlack-600 transition-opacity"
    >
      <div className="flex items-center gap-2 text-sm text-richBlack-100">
        {isBusy ? <InlineSpinner /> : <AlignLeft size={15} className="text-richBlack-400 shrink-0" />}
        <span className={isBusy ? 'text-richBlack-400' : ''}>{lecture.title}</span>
        {isUpdating && <span className="text-xs text-richBlack-400">Saving…</span>}
        {isDeleting && <span className="text-xs text-richBlack-400">Deleting…</span>}
      </div>
      <div className="flex items-center gap-3">
        <IconBtn title="Edit lecture" disabled={isBusy} onClick={() => onEdit(sectionId, lecture)}>
          <Pencil size={15} />
        </IconBtn>
        <IconBtn title="Delete lecture" disabled={isBusy} onClick={() => onDelete(sectionId, lecture._id)}>
          <Trash size={15} />
        </IconBtn>
      </div>
    </motion.div>
  );
};

const SectionTitleEditor = ({ initialName, onSave, onCancel, isSaving }) => {
  const [value, setValue] = useState(initialName);
  return (
    <div className="flex items-center gap-2 flex-1">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave(value);
          if (e.key === 'Escape') onCancel();
        }}
        className="flex-1 bg-richBlack-600 border border-yellow-400 rounded px-3 py-1
                   text-sm text-white outline-none"
      />
      <IconBtn title="Save" disabled={isSaving} onClick={() => onSave(value)}>
        {isSaving ? <InlineSpinner /> : <Check size={15} className="text-yellow-400" />}
      </IconBtn>
      <IconBtn title="Cancel" disabled={isSaving} onClick={onCancel}>
        <X size={15} className="text-red-400" />
      </IconBtn>
    </div>
  );
};

const CLOSED_MODAL = { isOpen: false, mode: 'create', lecture: null, sectionId: null };

const CourseBuilderForm = () => {
  const dispatch = useDispatch();
  const { courseId, sectionId: editingSectionId, isEditSection } = useSelector(
    (state) => state.course
  );

  const [sectionTitle, setSectionTitle] = useState('');
  const [modalState, setModalState] = useState(CLOSED_MODAL);
  const [openSections, setOpenSections] = useState({});

  const [deletingSection, setDeletingSection] = useState(new Set());
  const [deletingLecture, setDeletingLecture] = useState(new Set());
  const [updatingLecture, setUpdatingLecture] = useState(new Set());
  const [addingLectureTo, setAddingLectureTo] = useState(new Set());

  // ✅ Tracks whether the modal's API call is in-flight
  const [isModalLoading, setIsModalLoading] = useState(false);

  const { data: CourseSections, isPending } = useGetSectionsByCourse({ courseId });
  const sections = CourseSections?.data ?? [];

  const { mutate: CreateSection, isPending: isCreatingSection } = useCreateSection();
  const { mutate: DeleteSection } = useDeleteSection();
  const { mutate: UpdateSection, isPending: isSavingSection } = useUpdateSection();

  const { mutateAsync: CreateSubSection } = useCreateSubSection();
  const { mutateAsync: UpdateSubSection } = useUpdateSubSection();
  const { mutateAsync: DeleteSubSection } = useDeleteSubSection();

  // ── Section handlers ──────────────────────────────────────────────────────

  const addSection = () => {
    if (!sectionTitle.trim()) { toast.error('Enter section title'); return; }
    CreateSection({ name: sectionTitle, courseId });
    setSectionTitle('');
  };

  const startEditSection = (section) => {
    dispatch(setSection(section));
    dispatch(setSectionId(section._id));
    dispatch(setIsEditSection(true));
  };

  const saveEditSection = (newName) => {
    if (!newName.trim()) { toast.error('Section title cannot be empty'); return; }
    UpdateSection(
      { sectionId: editingSectionId, name: newName, courseId },
      { onSuccess: cancelEditSection }
    );
  };

  const cancelEditSection = () => {
    dispatch(setIsEditSection(false));
    dispatch(setSection(null));
    dispatch(setSectionId(null));
  };

  const handleDeleteSection = (sectionId) => {
    setDeletingSection((prev) => new Set(prev).add(sectionId));
    DeleteSection(
      { sectionId, courseId },
      {
        onSettled: () =>
          setDeletingSection((prev) => {
            const next = new Set(prev);
            next.delete(sectionId);
            return next;
          }),
      }
    );
  };

  const toggleSection = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  // ── SubSection handlers ───────────────────────────────────────────────────

  const openCreateModal = (sectionId) => {
    dispatch(setIsEditSubSection(false));
    dispatch(setSubSection(null));
    dispatch(setSubSectionId(null));
    setModalState({ isOpen: true, mode: 'create', lecture: null, sectionId });
  };

  const openEditModal = (sectionId, lecture) => {
    dispatch(setSubSection(lecture));
    dispatch(setSubSectionId(lecture._id));
    dispatch(setIsEditSubSection(true));
    setModalState({ isOpen: true, mode: 'edit', lecture, sectionId });
  };

  // ✅ closeModal also resets isModalLoading — safe to call any time
  const closeModal = () => {
    setModalState(CLOSED_MODAL);
    setIsModalLoading(false);
    dispatch(setIsEditSubSection(false));
    dispatch(setSubSection(null));
    dispatch(setSubSectionId(null));
  };

  // ✅ KEY FIX:
  // - setIsModalLoading(true) before the API call → submit button shows spinner
  // - closeModal() only called inside try (on success)
  // - setIsModalLoading(false) in finally → button resets even on error
  // - On error: modal stays open so the user can retry or fix their input
  const handleLectureSubmit = async (formData, sectionId, lectureId) => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('sectionId', sectionId);
    if (formData.file) data.append('file', formData.file);

    setIsModalLoading(true);

    try {
      if (lectureId) {
        setUpdatingLecture((prev) => new Set(prev).add(lectureId));
        await UpdateSubSection({ subSectionId: lectureId, data, courseId });
        setUpdatingLecture((prev) => {
          const next = new Set(prev);
          next.delete(lectureId);
          return next;
        });
      } else {
        setAddingLectureTo((prev) => new Set(prev).add(sectionId));
        await CreateSubSection({ data, courseId });
        setAddingLectureTo((prev) => {
          const next = new Set(prev);
          next.delete(sectionId);
          return next;
        });
      }

      // ✅ Only close on success
      closeModal();
    } catch {
      // Error toast is handled inside the hook's onError.
      // Modal stays open so the user can retry.
      setIsModalLoading(false);
    }
  };

  const deleteLecture = (sectionId, lectureId) => {
    setDeletingLecture((prev) => new Set(prev).add(lectureId));
    DeleteSubSection(
      { subSectionId: lectureId, sectionId, courseId },
      {
        onSettled: () =>
          setDeletingLecture((prev) => {
            const next = new Set(prev);
            next.delete(lectureId);
            return next;
          }),
      }
    );
  };

  const handleNext = () => {
    if (sections.length === 0) {
      toast.error('Add at least one section before proceeding');
      return;
    }
    dispatch(nextStep());
  };

  if (isPending) return <div className="text-white p-6">Loading...</div>;

  return (
    <>
      <div className="bg-richBlack-800 border border-richBlack-600 p-6 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold mb-4">Course Builder</h2>

        <AnimatePresence initial={false}>
          {sections.map((section) => {
            const isThisSectionEditing = isEditSection && editingSectionId === section._id;
            const isOpen = openSections[section._id];
            const isSectionDeleting = deletingSection.has(section._id);
            const isAddingLecture = addingLectureTo.has(section._id);

            return (
              <motion.div
                key={section._id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: isSectionDeleting ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="bg-richBlack-700 rounded-lg overflow-hidden border border-richBlack-600"
              >
                <div className="flex items-center justify-between px-4 py-3 gap-3">
                  {isThisSectionEditing ? (
                    <SectionTitleEditor
                      initialName={section.name}
                      onSave={saveEditSection}
                      onCancel={cancelEditSection}
                      isSaving={isSavingSection}
                    />
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 text-sm flex-1 min-w-0">
                        {isSectionDeleting ? <InlineSpinner /> : <AlignLeft size={16} className="shrink-0" />}
                        <span className={`truncate ${isSectionDeleting ? 'text-richBlack-400' : ''}`}>
                          {section.name}
                        </span>
                        {isSectionDeleting && (
                          <span className="text-xs text-richBlack-400 shrink-0">Deleting…</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <IconBtn title="Edit section" disabled={isSectionDeleting} onClick={() => startEditSection(section)}>
                          <Pencil size={15} />
                        </IconBtn>
                        <IconBtn title="Delete section" disabled={isSectionDeleting} onClick={() => handleDeleteSection(section._id)}>
                          {isSectionDeleting ? <InlineSpinner /> : <Trash size={16} />}
                        </IconBtn>
                        <IconBtn title={isOpen ? 'Collapse' : 'Expand'} disabled={isSectionDeleting} onClick={() => toggleSection(section._id)}>
                          <ChevronUp
                            size={18}
                            className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
                          />
                        </IconBtn>
                      </div>
                    </>
                  )}
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-2 pt-1">
                    <AnimatePresence>
                      {section.subSection?.map((lecture) => (
                        <LectureRow
                          key={lecture._id}
                          lecture={lecture}
                          sectionId={section._id}
                          onDelete={deleteLecture}
                          onEdit={openEditModal}
                          isUpdating={updatingLecture.has(lecture._id)}
                          isDeleting={deletingLecture.has(lecture._id)}
                        />
                      ))}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => !isAddingLecture && openCreateModal(section._id)}
                      disabled={isAddingLecture}
                      className="flex items-center gap-2 text-yellow-400 text-sm
                                 hover:text-yellow-300 transition-colors mt-1
                                 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isAddingLecture ? (
                        <><InlineSpinner /><span className="text-richBlack-400">Adding lecture…</span></>
                      ) : (
                        '+ Add Lecture'
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className="space-y-3 pt-2">
          <input
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSection())}
            placeholder="Add a section title"
            className="w-full bg-richBlack-700 border border-richBlack-600 px-4 py-2.5 rounded
                       focus:outline-none focus:border-yellow-400 transition-colors text-sm
                       text-white placeholder:text-richBlack-400"
          />
          <Button
            type="button"
            onClick={addSection}
            disabled={isCreatingSection}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium
                       disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreatingSection ? <><Loader2 size={15} className="animate-spin" />Adding…</> : '+ Add Section'}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          onClick={() => dispatch(prevStep())}
          className="flex items-center gap-2 bg-richBlack-700 border border-richBlack-600
                     text-white hover:bg-richBlack-600 font-medium"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
        >
          Next
        </Button>
      </div>

      {/* ✅ isLoading passed so the submit button inside LectureFormContent shows spinner */}
      <LectureModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        lecture={modalState.lecture}
        sectionId={modalState.sectionId}
        onClose={closeModal}
        onSubmit={handleLectureSubmit}
        isLoading={isModalLoading}
      />
    </>
  );
};

export default CourseBuilderForm;