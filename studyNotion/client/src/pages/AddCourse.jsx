import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../redux/apislices/categoryApiSlice";
import AddCourseStepper from "../components/core/dashboard/AddCourse/CourseInformation/AddCourseStepper";
import CourseInformation from "../components/core/dashboard/AddCourse/CourseInformation/CourseInformation";
import CourseBuilder from "../components/core/dashboard/AddCourse/CourseBuilder/CourseBuilder";
import CoursePublish from "../components/core/dashboard/AddCourse/PublichCourse/CoursePublish";

const AddCourse = () => {
  const { activeStep } = useSelector((state) => state.course);

  const { data } = useGetAllCategoriesQuery();

  console.log("data is category", data);

  return (
    <div className="w-full min-h-[100vh] my-10 lg:mt-0 mt-16 px-4 sm:px-6">
      <div className="font-inter w-full  flex  gap-6 text-white h-full my-6 p-4">
        {/* Left side form part  */}
        <div className=" w-8/12 ">
          <h2 className="text-2xl font-bold">Add Course</h2>

          <AddCourseStepper activeStep={activeStep} />
          {activeStep === 0 && <CourseInformation category={data?.allCategories} />}
          {activeStep === 1 && <CourseBuilder />}

          {activeStep === 2 && <CoursePublish />}
        </div>

        {/* Right side part Instructions */}
        <div className="w-4/12 gap-4 space-y-2 font-inter px-4 py-6 h-fit rounded-md border border-richblack-700 bg-richblack-800">
          <h3 className=" font-semibold">⚡ Course Upload Tips</h3>
          <ul className=" list-disc list-inside text-sm font-light space-y-2 ">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
