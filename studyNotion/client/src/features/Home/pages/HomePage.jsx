import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';

const HomePage = () => {
  return (
    <div className=" w-full h-auto text-white min-h-screen  space-y-4 mt-14">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default HomePage;
