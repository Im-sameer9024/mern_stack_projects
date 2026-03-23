import { useMutation, useQuery } from '@tanstack/react-query';
import { myCoursesApiOperations } from '../operations/myCoursesApiOperations';
import queryClient from '@/utils/reactQuery';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';

export const useGetAllCoursesByInstructor = (page) => {
  return useQuery({
    queryKey: ['courses', page],
    queryFn: () => myCoursesApiOperations.GetAllCoursesByInstructor(page),
    keepPreviousData: true,
  });
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: () => myCoursesApiOperations.DeleteCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success(data.message);
    },
     onError: (error) => {
          toast.error(getErrorMessage(error));
        },
  });
};
