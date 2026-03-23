import { apiConnector } from '@/services/apiConnector';
import { profileApiUrls } from '@/services/apiEndpoints';

const { PROFILE_UPDATE, PROFILE_IMAGE_UPDATE, ACCOUNT_DELETE, GET_PROFILE, GET_ENROLLED_COURSES } =
  profileApiUrls;

export const ProfileApiOperations = {
  UpdateProfile: async (data) => {
    const response = await apiConnector({
      method: 'PUT',
      url: PROFILE_UPDATE,
      bodyData: data,
    });
    return response.data;
  },

  UpdateProfileImage: async (data, onUploadProgress) => {
    const response = await apiConnector({
      method: 'PATCH',
      url: PROFILE_IMAGE_UPDATE,
      bodyData: data,
      onUploadProgress,
    });
    return response.data;
  },

  DeleteAccount: async () => {
    const response = await apiConnector({
      method: 'DELETE',
      url: ACCOUNT_DELETE,
    });
    return response.data;
  },

  GetProfileDetails: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_PROFILE,
    });
    return response.data;
  },
  GetEnrolledCourses: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ENROLLED_COURSES,
    });
    return response.data;
  },
};
