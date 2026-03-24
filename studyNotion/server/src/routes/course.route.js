import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { auth, isTeacher } from '../middlewares/auth.middleware.js';
import {
  CreateCourse,
  DeleteCourse,
  GetAllCourses,
  GetAllCoursesByInstructor,
  GetCourseDetails,
  UpdateCourse,
  UpdateCourseStatus,
} from '../controllers/course.controller.js';
import { CreateCourseValidator, UpdateCourseValidator } from '../validator/course.validator.js';
import {
  CreateSection,
  DeleteSection,
  GetAllSections,
  UpdateSection,
} from '../controllers/section.controller.js';
import {
  CreateSubSection,
  DeleteSubSection,
  UpdateSubSection,
} from '../controllers/subSection.controller.js';
import {
  subSectionDataUpdateValidator,
  subSectionDataValidator,
} from '../validator/subSection.validator.js';
import { imageUpload, videoUpload } from '../middlewares/multer.middleware.js';

const route = express.Router();

//*******************************************************************//
//                          COURSE ROUTES
//*******************************************************************//

route.post(
  '/course/create-course',
  auth,
  isTeacher,
  imageUpload.single('file'),
  validate(CreateCourseValidator),
  CreateCourse
);
route.put(
  '/course/update-course',
  auth,
  isTeacher,
  imageUpload.single('file'),
  validate(UpdateCourseValidator),
  UpdateCourse
);
route.delete('/course/delete-course', auth, isTeacher, DeleteCourse);
route.get('/course/get-all-courses', GetAllCourses);
route.get('/course/get-course-details/:courseId', GetCourseDetails);
route.get('/course/get-courses-by-instructor', auth, isTeacher, GetAllCoursesByInstructor);
route.put('/course/update-course-status',auth,isTeacher,UpdateCourseStatus)
//*******************************************************************//
//                          SECTION ROUTES
//*******************************************************************//

route.post('/section/create-section', auth, isTeacher, CreateSection);
route.delete('/section/delete-section', auth, isTeacher, DeleteSection);
route.put('/section/update-section', auth, isTeacher, UpdateSection);
route.get('/section/get-all-sections/:courseId', auth, isTeacher, GetAllSections);

//*******************************************************************//
//                         SUB-SECTION ROUTES
//*******************************************************************//

route.post(
  '/sub-section/create-sub-section',
  auth,
  isTeacher,
  videoUpload.single('file'),
  validate(subSectionDataValidator),
  CreateSubSection
);
route.put(
  '/sub-section/update-sub-section',
  auth,
  isTeacher,
  videoUpload.single('file'),
  validate(subSectionDataUpdateValidator),
  UpdateSubSection
);
route.post('/sub-section/delete-sub-section', auth, isTeacher, DeleteSubSection);

export default route;
