/* eslint-disable no-unused-vars */
import React from 'react';
import foundingStory from '../../../assets/Images/FoundingStory.png';
import { motion } from 'framer-motion';

const AboutSection2 = () => {
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

  const imageItem = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-richblack-900 w-full py-12 lg:py-20">
      <div className="w-11/12 mx-auto max-w-7xl">
        {/* Section 1 - Founding Story */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-20 mb-28 lg:mb-40"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-4 md:space-y-6"
            variants={item}
          >
            <motion.h3 
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-bold text-2xl sm:text-3xl md:text-4xl"
              variants={item}
            >
              Our Founding Story
            </motion.h3>
            <motion.div 
              className="space-y-4 text-richblack-300 text-sm sm:text-base md:text-lg"
              variants={container}
            >
              <motion.p variants={item}>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized the
                need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </motion.p>
              <motion.p variants={item}>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We envisioned
                a platform that could bridge these gaps and empower individuals
                from all walks of life to unlock their full potential.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            variants={imageItem}
          >
            <img 
              src={foundingStory} 
              alt="Founding story illustration" 
              className="w-full max-w-lg rounded-lg shadow-xl object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        {/* Section 2 - Vision & Mission */}
        <motion.div 
          className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 xl:gap-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Vision */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-4 md:space-y-6"
            variants={item}
          >
            <motion.h3 
              className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold text-2xl sm:text-3xl md:text-4xl"
              variants={item}
            >
              Our Vision
            </motion.h3>
            <motion.p 
              className="text-richblack-300 text-sm sm:text-base md:text-lg"
              variants={item}
            >
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </motion.p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-4 md:space-y-6"
            variants={item}
          >
            <motion.h3 
              className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-2xl sm:text-3xl md:text-4xl"
              variants={item}
            >
              Our Mission
            </motion.h3>
            <motion.p 
              className="text-richblack-300 text-sm sm:text-base md:text-lg"
              variants={item}
            >
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection2;