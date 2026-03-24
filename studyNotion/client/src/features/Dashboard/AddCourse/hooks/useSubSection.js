import { useMutation } from '@tanstack/react-query';
import { subSectionApiOperations } from '../operations/addCourseApiOperations';
import queryClient from '@/utils/reactQuery';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';

export const useCreateSubSection = () => {
  return useMutation({
    mutationFn: ({ data }) => subSectionApiOperations.CreateSubSection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['sections', variables.courseId],
      });
      toast.success('Lecture created');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateSubSection = () => {
  return useMutation({
    mutationFn: ({ data }) => subSectionApiOperations.UpdateSubSection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['sections', variables.courseId],
      });
      toast.success('Lecture updated');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteSubSection = () => {
  return useMutation({
    mutationFn: ({ subSectionId }) => subSectionApiOperations.DeleteSubSection({ subSectionId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['sections', variables.courseId],
      });
      toast.success('Lecture deleted');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
