import React from 'react';
import CourseTips from '../components/CourseTips';
import RenderSteps from '../components/RenderSteps';

const AddCoursePage = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse gap-8 text-white">
      {/* Left Section */}
      <div className="md:w-[70%] w-full">
        <h2 className="text-2xl font-semibold mb-6">Create Course</h2>
        <RenderSteps />
      </div>

      {/* Right Section */}
      <CourseTips />
    </div>
  );
};

export default AddCoursePage;
