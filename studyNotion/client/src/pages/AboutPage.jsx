/* eslint-disable no-unused-vars */
import {  useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection1 from "../components/core/About/AboutSection1";
import AboutSection2 from "../components/core/About/AboutSection2";
import AboutSection3 from "../components/core/About/AboutSection3";
import AboutSection4 from "../components/core/About/AboutSection4";
import AboutSection5 from "../components/core/About/AboutSection5";
import ReviewSlider from "../components/core/Home/ReviewSlider";

const AboutPage = () => {

  const { user } = useSelector((state) => state.profile);

  console.log("user data is ", user);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // delay between each child animation
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        <motion.section
          key="content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full overflow-hidden"
        >
          <AboutSection1 />
          <AboutSection2 />
          <AboutSection3 />
          <AboutSection4 />
          <AboutSection5 />
          <ReviewSlider />
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default AboutPage;
