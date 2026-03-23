import HighlightText from '@/features/Home/components/HightLightText';
import about1 from '/Images/aboutus1.webp';
import about2 from '/Images/aboutus2.webp';
import about3 from '/Images/aboutus3.webp';

const Section1 = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-16 space-y-16 text-center">
      {/* Heading Section */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
          Driving Innovation in Online Education for a <HighlightText txt="Brighter Future" />
        </h2>

        <p className="text-sm md:text-base text-richBlack-200">
          StudyNotion is at the forefront of driving innovation in online education. We're
          passionate about creating a brighter future by offering cutting-edge courses, leveraging
          emerging technologies, and nurturing a vibrant learning community.
        </p>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <img src={about1} alt="Student learning" className="w-full h-64 object-cover rounded-lg" />
        <img src={about2} alt="Online study" className="w-full h-64 object-cover rounded-lg" />
        <img src={about3} alt="Writing notes" className="w-full h-64 object-cover rounded-lg" />
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto text-lg md:text-2xl font-medium leading-relaxed">
        <span className="text-richBlack-300 text-3xl">“</span>
        We are passionate about revolutionizing the way we learn. Our innovative platform{' '}
        <HighlightText txt="combines technology," /> expertise, and community to create an{' '}
        <HighlightText txt="unparalleled educational experience." />
        <span className="text-richBlack-300 text-3xl">”</span>
      </div>
    </section>
  );
};

export default Section1;
