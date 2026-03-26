export const userApiUrls = {
  SIGNUP_USER: `/user/signup`,
  LOGIN_USER: `/user/login`,
  SEND_OTP: `/user/send-otp`,
  REFRESH_ACCESS_TOKEN: `/user/refresh-token}`,
  GET_IN_TOUCH: `/user/get-in-touch`,
  LOGOUT_USER: `/user/logout`,
  RESET_PASSWORD_TOKEN: '/password/resetPassword-token',
  RESET_PASSWORD: '/password/resetPassword',
};

export const profileApiUrls = {
  PROFILE_UPDATE: '/profile/update-profile',
  PROFILE_IMAGE_UPDATE: '/profile/update-profileImage',
  ACCOUNT_DELETE: '/profile/delete-account',
  GET_PROFILE: '/profile/get-profile-details',
  GET_ENROLLED_COURSES: '/profile/get-enrolledCourses',
};

export const settingApiUrls = {
  CHANGE_PASSWORD: '/user/change-password',
  DELETE_USER_ACCOUNT: '',
};

export const categoryApiUrls = {
  CREATE_CATEGORY: '/category/create-category',
  DELETE_CATEGORY: (categoryId) => `category/delete-category/${categoryId}`,
  UPDATE_CATEGORY: (categoryId) => `category/update-category/${categoryId}`,
  GET_ALL_CATEGORIES: '/category/get-categories',
  GET_CATEGORY_DETAILS: (categoryId) => `/category/get-category-details/${categoryId}`,
};

export const ratingAndReviewApiUrls = {
  CREATE_RATING_REVIEW: '/rating-review/create-review',
  GET_AVERAGE_RATING: (courseId) => `/rating-review/get-average-rating/${courseId}`,
  GET_ALL_RATING_REVIEW: '/rating-review/get-all-rating',
};

export const courseApiUrls = {
  CREATE_COURSE: '/course/create-course',
  UPDATE_COURSE: '/course/update-course',
  GET_ALL_COURSE: '/course/get-all-courses',
  GET_COURSE_DETAILS: (courseId) => `/course/get-course-details/${courseId}`,
  GET_COURSES_BY_INSTRUCTOR: (page) => `/course/get-courses-by-instructor?page=${page}&limit=10`,
  DELETE_COURSE: `/course/delete-course`,
  UPDATE_COURSE_STATUS: '/course/update-course-status',
};

export const cartApiUrls = {
  ADD_TO_CART: '/course/add-to-cart',
  GET_CART_DETAILS: '/course/get-cart',
  REMOVE_CART_ITEM: '/course/remove-from-cart',
  CREATE_ORDER:"/payment/capture",
  ORDER_VERIFY:"/payment/verify"
};

export const sectionApiUrls = {
  CREATE_SECTION: '/section/create-section',
  UPDATE_SECTION: '/section/update-section',
  DELETE_SECTION: '/section/delete-section',
  GET_SECTIONS_BY_COURSE: (courseId) => `/section/get-all-sections/${courseId}`,
};

export const subSectionApiUrls = {
  CREATE_SUBSECTION: '/sub-section/create-sub-section',
  UPDATE_SUBSECTION: '/sub-section/update-sub-section',
  DELETE_SUBSECTION: '/sub-section/delete-sub-section',
};
