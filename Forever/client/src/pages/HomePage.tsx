import BestCollection from "../components/core/Home/BestCollection";
import HeaderSection from "../components/core/Home/HeaderSection";
import LatestCollection from "../components/core/Home/LatestCollection";
import ServicesSection from "../components/core/Home/ServicesSection";

const HomePage = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6 lg:px-10 py-3 lg:mt-16 md:mt-10 sm:mt-6 mt-4">
      <HeaderSection />
      <LatestCollection/>
      <BestCollection/>
      <ServicesSection/>
    </section>
  );
};

export default HomePage;
