import React from 'react';
import Courses from '../components/Courses';

const EnrolledCourses = () => {
  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">Enrolled Courses</h2>
      <Courses />
    </div>
  );
};

export default EnrolledCourses;
