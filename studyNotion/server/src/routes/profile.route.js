import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { ProfileDataValidator } from '../validator/profile.validator.js';
import { auth } from '../middlewares/auth.middleware.js';
import {
  DeleteUserAccount,
  GetEnrolledCourses,
  GetUserDetails,
  UpdateProfile,
  UpdateProfileImage,
} from '../controllers/profile.controller.js';
import { imageUpload } from '../middlewares/multer.middleware.js';

const route = express.Router();

route.put('/profile/update-profile', validate(ProfileDataValidator), auth, UpdateProfile);
route.patch('/profile/update-profileImage', auth, imageUpload.single('file'), UpdateProfileImage);
route.delete('/profile/delete-account', auth, DeleteUserAccount);
route.get('/profile/get-profile-details', auth, GetUserDetails);
route.get('/profile/get-enrolledCourses', auth, GetEnrolledCourses);

export default route;
