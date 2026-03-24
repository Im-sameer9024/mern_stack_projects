import { useMutation, useQuery } from '@tanstack/react-query';
import { sectionApiOperations } from '../operations/addCourseApiOperations';
import { getErrorMessage } from '@/utils/helpers';
import { toast } from 'sonner';
import queryClient from '@/utils/reactQuery';

export const useGetSectionsByCourse = ({ courseId }) => {
  return useQuery({
    queryKey: ['sections', courseId],
    queryFn: () => sectionApiOperations.GetSectionsByCourse({ courseId }),
    enabled: !!courseId,
  });
};

export const useCreateSection = () => {
  return useMutation({
    // variables = { name, courseId }
    mutationFn: sectionApiOperations.CreateSection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sections', variables.courseId] });
      toast.success('Section created');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateSection = () => {
  return useMutation({
    mutationFn: sectionApiOperations.UpdateSection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sections', variables.courseId] });
      toast.success('Section updated');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteSection = () => {
  return useMutation({
    mutationFn: sectionApiOperations.DeleteSection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sections', variables.courseId] });
      toast.success('Section deleted');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
