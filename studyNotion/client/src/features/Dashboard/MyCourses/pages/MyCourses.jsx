// MyCourses.jsx
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { useDeleteCourse, useGetAllCoursesByInstructor } from '../hooks/useMyCourses';
import CourseTable from '../components/CourseTable';
import CourseSkeleton from '../components/CourseSkeleton';
import { PaginationComponent } from '@/components/custom/PaginationComponent';
import { useState } from 'react';
import CTAButton from '@/features/Home/components/CTAButton';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import {
  clearCourseData,
  setCourseId,
  setIsEditCourse,
  setStep,
} from '../../AddCourse/courseSlice';
import Modal from '@/components/custom/Modal';
import { RxCross2 } from 'react-icons/rx';

// ── main ──────────────────────────────────────────────────────────────────
const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //---------------- pagination -------------
  const [page, setPage] = useState(1);
  const { data: myCourses, isLoading } = useGetAllCoursesByInstructor(page);
  const { mutate: DeleteCourse, isPending: isDeletingCourse } = useDeleteCourse();
  const pagination = myCourses?.data?.pagination ?? {};

  const nextPageHandler = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };
  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const courses = myCourses?.data?.courses ?? [];

  const handleEdit = (id) => {
    dispatch(setIsEditCourse(true));
    dispatch(setCourseId(id));
    navigate('/dashboard/add-course');
    dispatch(setStep(1));
  };
  const handleDelete = (id) => {
    // 🔁 wire up your delete mutation + confirm dialog here
    console.log('Delete course:', id);
  };

  const handleAddCourse = () => {
    dispatch(clearCourseData());
    navigate('/dashboard/add-course');
  };

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Course</h2>
        <Button
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium
                     bg-yellow-400 text-black hover:bg-yellow-300 transition-colors"
        >
          <Plus size={16} />
          Add Course
        </Button>
      </div>

      {/* Table or skeleton */}
      {isLoading ? (
        <CourseSkeleton />
      ) : (
        <>
          <CourseTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
          <PaginationComponent
            pagination={pagination}
            nextPageHandler={nextPageHandler}
            prevPageHandler={prevPageHandler}
          />
          <Modal
            isVisible={openDeleteModal}
            width={'lg:w-[25%]'}
            content={
              <div className="space-y-5">
                {/* Header */}
                <div className="flex justify-end items-center">
                  <Button onClick={() => setOpenDeleteModal(false)} disabled={openDeleteModal}>
                    <RxCross2 size={18} />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-center">
                    Are you want to Delete Course ?
                  </h3>
                  <div className=" flex  justify-center gap-4 mt-4">
                    <Button
                      onClick={openDeleteModal}
                      className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
                    >
                      <LogOut size={16} />
                      {isDeletingCourse ? 'Loading....' : 'Delete'}
                    </Button>
                    <Button
                      onClick={() => setOpenDeleteModal(false)}
                      className="flex items-center gap-2 text-black bg-slate-300 hover:bg-slate-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            }
          />
        </>
      )}
    </div>
  );
};

export default MyCourses;
