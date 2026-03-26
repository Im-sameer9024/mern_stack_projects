import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useGetSingleCourse } from '@/features/Dashboard/AddCourse/hooks/useCourse';
import CourseDetailSkeleton from '../components/Coursedetailskeleton';
import { Button } from '@/components/ui/button';
import CourseDetailHero from '../components/Coursedetailhero';
import WhatYouLearn from '../components/Whatyoulearn';
import CourseContentAccordion from '../components/Coursecontentaccordin';
import CourseInstructor from '../components/Courseinstructor';
import CoursePurchaseCard from '../components/Coursepurchasecard';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, error } = useGetSingleCourse(courseId);

  const course = useMemo(() => data?.data ?? null, [data]);

  if (isPending) return <CourseDetailSkeleton />;

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richBlack-900">
        <div className="text-center space-y-3">
          <p className="text-red-400 text-lg font-medium">Course not found</p>
          <Button onClick={() => navigate('/catalog')}>Browse courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richBlack-900 text-white mt-20">
      <div className="bg-richBlack-800 border-b border-richBlack-700">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <CourseDetailHero course={course} category={course.category} />
          </div>

          <div className="">
            <CoursePurchaseCard course={course} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <WhatYouLearn items={course.whatYouWillLearn} />
          <CourseContentAccordion sections={course.courseContent} />
          <CourseInstructor instructor={course.instructor} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
