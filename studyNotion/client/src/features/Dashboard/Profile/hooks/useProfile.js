import { useMutation, useQuery } from '@tanstack/react-query';
import { ProfileApiOperations } from '../operations/profileApiOperations';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';
import queryClient from '@/utils/reactQuery';
import { useSelector } from 'react-redux';

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ProfileApiOperations.UpdateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: ({ formData, onUploadProgress }) =>
      ProfileApiOperations.UpdateProfileImage(formData, onUploadProgress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: ProfileApiOperations.DeleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useProfileDetails = () => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['userDetails'],
    queryFn: ProfileApiOperations.GetProfileDetails,
    enabled: !!token,
  });
};

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: ProfileApiOperations.GetEnrolledCourses,
  });
};
