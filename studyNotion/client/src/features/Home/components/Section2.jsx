import { codeStringBlock1, codeStringBlock2 } from '@/data/constants';
import CodeBlock from './CodeBlock';
import CTAButton from './CTAButton';
import { FaArrowRightLong } from 'react-icons/fa6';
import HighlightText from './HightLightText';

const Section2 = () => {
  return (
    <section className="py-20 px-4 space-y-40">
      {/*-------------- part-1 ---------------- */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side text */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Unlock your <HighlightText txt="coding potential" /> with our online courses.
          </h2>

          <p className="text-richBlack-100 text-sm md:text-base">
            Our courses are designed and taught by industry experts who have years of experience in
            coding and are passionate about sharing their knowledge with you.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <CTAButton linkto="/signup" active>
              <span className="flex items-center gap-2">
                Try it Yourself
                <FaArrowRightLong />
              </span>
            </CTAButton>

            <CTAButton linkto="/signup" active={false}>
              Learn More
            </CTAButton>
          </div>
        </div>

        {/* Right side code block */}
        <div className="w-full">
          <CodeBlock codeString={codeStringBlock1} />
        </div>
      </div>

      {/*---------------------- part-2 -------------------- */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side code block */}
        <div className="w-full order-1 md:order-0">
          <CodeBlock codeString={codeStringBlock2} />
        </div>

        {/* Right side text */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-0">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Start <HighlightText txt="coding in seconds" />
          </h2>

          <p className="text-richBlack-100 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Go ahead, give it a try. Our hands-on learning environment means you'll be writing real
            code from your very first lesson.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <CTAButton linkto="/signup" active>
              <span className="flex items-center gap-2">
                Continue Lesson
                <FaArrowRightLong />
              </span>
            </CTAButton>

            <CTAButton linkto="/signup" active={false}>
              Learn More
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
