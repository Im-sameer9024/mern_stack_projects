import express from "express"
import {createProfile,deleteProfile,getUserDetails,updateDisplayPicture,getEnrolledCourses} from '../controllers/ProfileController.js'
import { auth } from "../middlewares/AuthMiddleware.js";


const router = express.Router();


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
//---------------- create profile add the additional details ---------
router.post("/create-profile",auth,createProfile)

//----------- delete the profile or user----------

router.delete("/delete-profile",auth,deleteProfile)

//-----------get all information of the user----------

router.get("/get-user-details",auth,getUserDetails)

//-----------update the display picture----------
router.put("/update-display-picture",auth,updateDisplayPicture)

//-----------get all enrolled courses----------
router.get("/get-enrolled-courses",auth,getEnrolledCourses)

export default router;