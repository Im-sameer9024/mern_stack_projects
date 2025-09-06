/* eslint-disable no-unused-vars */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Section1 from "../components/core/Home/Section1";
import Section2 from "../components/core/Home/Section2";
import Section3 from "../components/core/Home/Section3";
import Section4 from "../components/core/Home/Section4";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = memo(() => {

  const { user } = useSelector((state) => state.profile, shallowEqual);

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
          className="w-full"
        >
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </motion.section>
      </AnimatePresence>
    </>
  );
});

export default HomePage;
