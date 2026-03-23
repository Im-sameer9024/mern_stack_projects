import { apiConnector } from '@/services/apiConnector';
import { courseApiUrls, sectionApiUrls, subSectionApiUrls } from '@/services/apiEndpoints';

const { CREATE_COURSE,UPDATE_COURSE, GET_ALL_COURSE, GET_COURSE_DETAILS } = courseApiUrls;
const { CREATE_SECTION, UPDATE_SECTION, DELETE_SECTION, GET_SECTIONS_BY_COURSE } = sectionApiUrls;
const { CREATE_SUBSECTION, UPDATE_SUBSECTION, DELETE_SUBSECTION } = subSectionApiUrls;

export const courseApiOperations = {
  CreateCourse: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_COURSE,
      bodyData: data,
    });
    return response.data;
  },

  UpdateCourse:async(data) =>{
    const response = await apiConnector({
      method: 'PUT',
      url: UPDATE_COURSE,
      bodyData: data,
    })
    return response.data;
  },

  GetAllCourses: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_COURSE,
    });
    return response.data;
  },

  GetCourseDetails: async (courseId) => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_COURSE_DETAILS(courseId),
    });
    return response.data;
  },
};

export const sectionApiOperations = {
  CreateSection: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_SECTION,
      bodyData: data,
    });
    return response.data;
  },

  UpdateSection: async (data) => {
    const response = await apiConnector({
      method: 'PUT',
      url: UPDATE_SECTION,
      bodyData: data,
    });
    return response.data;
  },

  DeleteSection: async (data) => {
    const response = await apiConnector({
      method: 'DELETE',
      url: DELETE_SECTION,
      bodyData: data,
    });
    return response.data;
  },

  GetSectionsByCourse: async ({courseId}) => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_SECTIONS_BY_COURSE(courseId),
    });
    return response.data;
  },
};


export const subSectionApiOperations = {
  CreateSubSection: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_SUBSECTION,
      bodyData: data,
    });
    return response.data;
  },

  UpdateSubSection:async(data) =>{
    const response = await apiConnector({
      method: 'POST',
      url: UPDATE_SUBSECTION,
      bodyData: data,
    })
    return response.data;
  },

  DeleteSubSection:async(data) =>{
    const response = await apiConnector({
      method: 'POST',
      url: DELETE_SUBSECTION,
      bodyData: data,
    })
    return response.data;
  }



}
