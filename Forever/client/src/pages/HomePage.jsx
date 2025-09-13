import React from "react";
import HeroSection from "../components/core/Home/HeroSection";
import LatestCollectionSection from "../components/core/Home/LatestCollectionSection";
import BestCollectionSection from "../components/core/Home/BestCollectionSection";
import ServicesSection from "../components/core/Home/ServicesSection";

const HomePage = () => {
  return (
    <section className=" py-16 flex flex-col gap-18   lg:gap-28 min-h-screen">
      <HeroSection />
      <LatestCollectionSection />
      <BestCollectionSection />
      <ServicesSection />
    </section>
  );
};

export default HomePage;
