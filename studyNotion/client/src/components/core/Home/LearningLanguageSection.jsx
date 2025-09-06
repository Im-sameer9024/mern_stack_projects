/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../../common/CTAButton";
import HighlightText from "../../common/HighlightText";

const LearningLanguageSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const imageVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="mt-[130px] mb-32"
    >
      <div className="flex flex-col gap-5 items-center">
        <motion.div 
          variants={itemVariants}
          className="md:text-4xl text-3xl font-semibold text-center px-4"
        >
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-richblack-600 mx-auto text-base font-medium w-full md:w-[70%] px-4"
        >
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </motion.p>

        <motion.div
          variants={imageContainerVariants}
          className="w-full max-w-6xl mx-auto px-4 py-8"
        >
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {/* Know your Progress Image Container */}
            <motion.div
              variants={imageVariants}
              className="flex-1 max-w-md md:-mr-32 lg:-mr-24 xl:-mr-16"
            >
              <img
                src={know_your_progress}
                alt="Know Your Progress"
                className="w-full h-auto object-contain  rounded-lg"
              />
            </motion.div>

            {/* Compare with others Image Container */}
            <motion.div
              variants={imageVariants}
              className="flex-1 max-w-md z-10"
            >
              <img
                src={compare_with_others}
                alt="Compare With Others"
                className="w-full h-auto object-contain  rounded-lg"
              />
            </motion.div>

            {/* Plan your lessons Image Container */}
            <motion.div
              variants={imageVariants}
              className="flex-1 max-w-md md:-ml-32 lg:-ml-24 xl:-ml-16"
            >
              <img
                src={plan_your_lesson}
                alt="Plan Your Lessons"
                className="w-full h-auto object-contain  rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-fit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn more</div>
          </CTAButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LearningLanguageSection;