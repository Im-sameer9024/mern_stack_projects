export const userRoles = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export const courseStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const availableRole = Object.values(userRoles);
export const availableCourseStatus = Object.values(courseStatus);

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict', // should be strict in production or none or lax
};
