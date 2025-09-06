/* eslint-disable no-unused-vars */
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../../common/HighlightText";
import CTAButton from "../../common/CTAButton";
import Banner from "../../../assets/Images/banner.mp4";
import { motion } from "framer-motion";

const Section1 = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const videoItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div 
      className="text-white w-11/12 mx-auto py-8 md:py-12 lg:py-16 mt-14 flex flex-col items-center justify-center gap-6 md:gap-8 font-inter"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      {/* Become an Instructor Button */}
      <motion.div variants={item}>
        <Link
          to={"/signup"}
          className="flex items-center gap-2 font-medium text-richblack-200 bg-richblack-800 px-4 py-2 rounded-full shadow-sm shadow-richblack-600 hover:bg-richblack-900 transition-all duration-200 hover:scale-95"
        >
          Become an Instructor
          <FaArrowRight className="text-xs" />
        </Link>
      </motion.div>

      {/* Heading */}
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-wide"
        variants={item}
      >
        Empower Your Future with{" "}
        <HighlightText text="Coding Skills" />
      </motion.h1>

      {/* Description */}
      <motion.p 
        className="text-center text-sm sm:text-base md:text-lg text-richblack-200 max-w-4xl mx-auto px-4"
        variants={item}
      >
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </motion.p>

      {/* Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-8"
        variants={container}
      >
        <motion.div variants={item}>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </motion.div>
        <motion.div variants={item}>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </motion.div>
      </motion.div>

      {/* Video Section */}
      <motion.div 
        className="mx-auto my-8 md:my-12 shadow-richblack-400 shadow-2xl rounded-xl overflow-hidden w-full max-w-5xl aspect-video"
        variants={videoItem}
      >
        <video
          muted
          loop
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={Banner} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default Section1;