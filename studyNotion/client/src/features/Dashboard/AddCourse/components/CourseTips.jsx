import React from 'react';

const tips = [
  'Set the Course Price option or make it free.',
  'Standard size for the course thumbnail is 1024x576.',
  'Video section controls the course overview video.',
  'Course Builder is where you create & organize a course.',
  'Add Topics in the Course Builder section to create lessons, quizzes, and assignments.',
  'Information from the Additional Data section shows up on the course page.',
  'Make Announcements to notify any important ',
  'Notes to all enrolled students at once.',
];

const CourseTips = () => {
  return (
    <div className="w-full md:max-w-[30%]">
      <div className="bg-[#111827] border border-gray-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          ⚡ Course Upload Tips
        </h3>

        <ul className="list-disc list-inside space-y-3 text-sm text-gray-300">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseTips;
