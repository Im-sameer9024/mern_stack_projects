import { apiConnector } from '@/services/apiConnector';
import { courseApiUrls } from '@/services/apiEndpoints';

const { GET_ALL_COURSE, GET_COURSE_DETAILS, GET_COURSES_BY_INSTRUCTOR, DELETE_COURSE } =
  courseApiUrls;

export const myCoursesApiOperations = {
  GetAllCoursesByInstructor: async (page) => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_COURSES_BY_INSTRUCTOR(page),
    });
    return response.data;
  },

  DeleteCourse: async () => {
    const response = await apiConnector({
      method: 'DELETE',
      url: DELETE_COURSE,
    });
    return response.data;
  },
};
