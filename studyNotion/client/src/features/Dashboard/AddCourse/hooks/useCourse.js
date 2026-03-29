import { useMutation, useQuery } from '@tanstack/react-query';
import { courseApiOperations } from '../operations/addCourseApiOperations';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';
import { useDispatch } from 'react-redux';
import { clearCourseData, nextStep, setCourse, setCourseId } from '../courseSlice';
import queryClient from '@/utils/reactQuery';
import { useNavigate } from 'react-router-dom';

export const useCreateCourse = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: courseApiOperations.CreateCourse,
    onSuccess: (data) => {
      // Invalidate both the list and the single-course entry
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses', data.data?._id] });
      dispatch(setCourse(data.data));
      dispatch(setCourseId(data.data?._id));
      toast.success(data.message);
      // ✅ Advance to Step 2 only on CREATE — update does not auto-advance
      dispatch(nextStep());
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      // ✅ Safe to clear on create failure — nothing was saved yet
      dispatch(clearCourseData());
    },
  });
};

export const useUpdateCourse = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: courseApiOperations.UpdateCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses', data.data?._id] });
      dispatch(setCourse(data.data));
      dispatch(setCourseId(data.data?._id));
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateCourseStatus = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: courseApiOperations.UpdateCourseStatus,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses', data.data?._id] });
      toast.success(data.message);
      navigate('/dashboard/my-courses');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: courseApiOperations.GetAllCourses,
  });
};

export const useGetSingleCourse = (courseId) => {
  return useQuery({
    queryKey: ['courses', courseId],
    queryFn: () => courseApiOperations.GetCourseDetails(courseId),
    enabled: !!courseId,
  });
};
