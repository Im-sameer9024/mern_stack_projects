import GetInTouchForm from '../components/GetInTouchForm';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';

const AboutPage = () => {
  return (
    <div className=" w-full h-auto text-white min-h-screen  mt-14 space-y-4">
      <Section1 />
      <Section2 />
      <Section3 />
      <GetInTouchForm
        heading="Get in Touch"
        para="We'd love to here for you, Please fill out this form."
      />
    </div>
  );
};

export default AboutPage;
