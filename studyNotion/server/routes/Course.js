import express from 'express'
const router = express.Router()



//---------------Course Controllers---------------------//
import { createCourse,getAllCourses,getCourseDetails } from '../controllers/CourseController.js'

//------------------Category Controllers-----------------//
import { createCategory, getAllCategories, categoryPageDetails } from '../controllers/CategoryController.js'

//------------------Section Controllers-----------------//
import { createSection, updateSection, deleteSection } from '../controllers/SectionController.js'

//------------------SubSection Controllers-----------------//

import { createSubSection, updateSubSection, deleteSubSection } from '../controllers/SubSectionController.js'

//------------------Rating and Review Controllers-----------------//
import { createRatingAndReview, getAverageRating, getAllRating } from '../controllers/RatingAndReviewController.js'


//-------------------------Middlewares-----------------//
import { auth,isAdmin,isInstructor,isStudent } from '../middlewares/AuthMiddleware.js'

//***************************************************************/
// Course can only created by instructor 
//***************************************************************//

router.get("/get-all-courses", getAllCourses)
router.get("/get-course-details", getCourseDetails)

router.post("/create-course", auth, isInstructor, createCourse)
router.post("/create-section",auth, isInstructor, createSection)
router.post("/create-subsection",auth,isInstructor,createSubSection)

router.put("/update-section",auth,isInstructor,updateSection)
router.put("/update-subsection",auth,isInstructor,updateSubSection)

router.delete("/delete-section",auth,isInstructor,deleteSection)
router.delete("/delete-subsection",auth,isInstructor,deleteSubSection)


//*************************************************************************//
// Category can only created by admin
//*************************************************************************//

router.post("/create-category", auth, isAdmin, createCategory)
router.get("/get-all-categories", getAllCategories)
router.get("/category-page-details/:categoryId", categoryPageDetails)

//*************************************************************************//
//Rating and Review
//*************************************************************************//

router.post("/create-rating", auth, isStudent, createRatingAndReview)
router.get("/get-average-rating", getAverageRating)
router.get("/get-all-rating", getAllRating)


export default router;