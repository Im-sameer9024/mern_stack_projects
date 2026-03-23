import { reviewData } from '@/data/constants';
import CTAButton from './CTAButton';
import HighlightText from './HightLightText';
import TeacherImg from '/Images/Instructor.webp';
import ReviewSlider from '@/components/common/ReviewSlider';

const Section4 = () => {
  return (
    <section className="py-20 px-4 space-y-20">
      {/* Part 1 - Instructor */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={TeacherImg}
            alt="Instructor"
            loading="lazy"
            className="rounded-lg shadow-lg max-w-sm w-full"
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">
            Become an <HighlightText txt="instructor" />
          </h2>

          <p className="text-richBlack-100">
            Instructors from around the world teach millions of students on StudyNotion. We provide
            the tools and skills to teach what you love.
          </p>

          <CTAButton linkto="/signup" active>
            Start Teaching Today
          </CTAButton>
        </div>
      </div>

      {/* Part 2 - Reviews */}
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Reviews from other learners</h2>

        <ReviewSlider ReviewData={reviewData} />
      </div>
    </section>
  );
};

export default Section4;
