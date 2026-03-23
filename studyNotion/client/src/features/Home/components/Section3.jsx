import { timelineData } from '@/data/constants';
import CTAButton from './CTAButton';
import TimeLineImg from '/Images/TimelineImage.webp';
import HighlightText from './HightLightText';

const Section3 = () => {
  return (
    <section className="py-20 px-4">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
        Get the skills you need for a <HighlightText txt="job that is in demand." />
      </h2>

      {/* Middle Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 h-full border-l border-dashed border-richBlack-300"></div>

          <div className="space-y-10">
            {timelineData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-6 relative">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-richBlack-800 flex items-center justify-center z-10">
                    <Icon className="text-lg text-yellow-400" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-richBlack-100">{item.des}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side Image */}
        <div className="flex justify-center">
          <img
            src={TimeLineImg}
            alt="timeline"
            loading="lazy"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-3xl mx-auto text-center mt-20 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Your swiss knife for <HighlightText txt="learning any language" />
        </h2>

        <p className="text-richBlack-100">
          Using spin making learning multiple language easy. With 20+ language realistic voice-over,
          progress tracking, custom schedule and more.
        </p>

        <CTAButton linkto="/signup" active>
          Learn More
        </CTAButton>
      </div>
    </section>
  );
};

export default Section3;
