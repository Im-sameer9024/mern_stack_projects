/* eslint-disable no-unused-vars */
import React from "react";
import { assets, features } from "../../assets/assets";
import { motion } from "framer-motion";

const BottomBanner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative mt-24 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content overflow-hidden"
    >
      {/* Background Images */}
      <motion.div variants={imageVariants}>
        <img
          src={assets.bottom_banner_image}
          alt="banner"
          className="w-full hidden md:block rounded-xl shadow-lg"
        />
        <img
          src={assets.bottom_banner_image_sm}
          alt="banner"
          className="w-full md:hidden block rounded-lg shadow-md"
        />
      </motion.div>

      {/* Content Overlay */}
      <motion.div 
        variants={contentVariants}
        className="absolute inset-0 flex flex-col items-center md:items-end justify-center py-8 md:py-0 md:pr-8 lg:pr-16 xl:pr-24 px-4 md:px-0"
      >
        <motion.div 
          className="bg-white/90 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none shadow-lg md:shadow-none max-w-md lg:max-w-lg"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-6 text-center md:text-left"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Why We Are the Best?
          </motion.h1>
          
          <div className="space-y-4 md:space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={featureVariants}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <motion.div variants={iconVariants}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-9 h-9 md:w-11 md:h-11 flex-shrink-0"
                  />
                </motion.div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default BottomBanner;