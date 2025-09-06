/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const AboutSection3 = () => {
  const statsData = [
    { id: 1, title: "Active Students", number: "5K" },
    { id: 2, title: "Mentors", number: "10+" },
    { id: 3, title: "Courses", number: "200+" },
    { id: 4, title: "Awards", number: "50+" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full bg-richblack-800 py-16 lg:py-24">
      <div className="w-11/12 mx-auto max-w-7xl">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {statsData.map((stat) => (
            <motion.div 
              key={stat.id}
              className="text-center p-4"
              variants={item}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-richblack-300 text-sm sm:text-base md:text-lg font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection3;