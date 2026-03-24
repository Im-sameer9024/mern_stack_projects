export const userRoles = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export const courseStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const userGender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const videoStatus = {
  PROCESSING: 'processing',
  COMPLETED: 'ready',
  FAILED: 'failed',
};

export const availableGender = Object.values(userGender);
export const availableRole = Object.values(userRoles);
export const availableCourseStatus = Object.values(courseStatus);
export const availableVideoStatus = Object.values(videoStatus);

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', // should be strict in production or none or lax
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};
