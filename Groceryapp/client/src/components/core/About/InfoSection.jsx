/* eslint-disable no-unused-vars */
import React from "react";
import {motion} from 'framer-motion'

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "1000+", label: "Fresh Products" },
  { number: "24/7", label: "Customer Support" },
  { number: "99%", label: "Satisfaction Rate" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const InfoSection = () => {
  return (
    <div className="py-20 bg-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center" variants={fadeInUp}>
              <div className="text-4xl lg:text-5xl font-bold text-green-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InfoSection;
