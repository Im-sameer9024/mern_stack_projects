import HighlightText from '@/features/Home/components/HightLightText';
import StoryImg from '/Images/FoundingStory.webp';

const Section2 = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-20 space-y-20">
      {/* Founding Story */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            <HighlightText txt="Our Founding Story" />
          </h2>

          <p className="text-richBlack-200 text-sm md:text-base leading-relaxed">
            Our e-learning platform was born out of a shared vision and passion for transforming
            education. It all began with a group of educators, technologists, and lifelong learners
            who recognized the need for accessible, flexible, and high-quality learning
            opportunities in a rapidly evolving digital world.
          </p>

          <p className="text-richBlack-200 text-sm md:text-base leading-relaxed">
            As experienced educators ourselves, we witnessed firsthand the limitations and
            challenges of traditional education systems. We believed that education should not be
            confined to the walls of a classroom or restricted by geographical boundaries. We
            envisioned a platform that could bridge these gaps and empower individuals from all
            walks of life to unlock their full potential.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={StoryImg}
            alt="Founding Story"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Vision */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-yellow-400">Our Vision</h3>

          <p className="text-richBlack-200 text-sm md:text-base leading-relaxed">
            With this vision in mind, we set out on a journey to create an e-learning platform that
            would revolutionize the way people learn. Our team of dedicated experts worked
            tirelessly to develop a robust and intuitive platform that combines cutting-edge
            technology with engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-cyan-400">Our Mission</h3>

          <p className="text-richBlack-200 text-sm md:text-base leading-relaxed">
            Our mission goes beyond just delivering courses online. We wanted to create a vibrant
            community of learners, where individuals can connect, collaborate, and learn from one
            another. We believe that knowledge thrives in an environment of sharing and dialogue,
            and we foster this spirit of collaboration through forums, live sessions, and networking
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section2;
