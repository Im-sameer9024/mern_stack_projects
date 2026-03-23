import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import headerImg from '/Images/boxoffice.webp';
import { Button } from '@/components/ui/button';
import HighlightText from './HightLightText';
import CTAButton from './CTAButton';

const Section1 = () => {
  return (
    <section className="py-16 px-4">
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Top Button */}
        <Button
          asChild
          className=" rounded-3xl group hover:cursor-pointer border-b border-richBlack-500 "
        >
          <Link to={'/signup'} className=" flex items-end gap-2">
            Become a Teacher
            <span className=" group-hover:translate-x-1 transition-all duration-300 ease-in-out">
              <FaArrowRightLong />
            </span>
          </Link>
        </Button>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Empower Your Future with <HighlightText txt="Coding Skills" />
        </h1>

        {/* Description */}
        <p className="text-richBlack-100 text-sm sm:text-base max-w-xl">
          With our online coding courses, you can learn at your own pace and on your own schedule,
          making it easier to fit coding into your busy life.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton linkto="/signup" active>
            Learn More
          </CTAButton>

          <CTAButton linkto="/signup" active={false}>
            Book a Demo
          </CTAButton>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-12 flex justify-center px-4">
        <img
          src={headerImg}
          loading="lazy"
          alt="Coding illustration"
          className="w-full max-w-4xl rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Section1;
