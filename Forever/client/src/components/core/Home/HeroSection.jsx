/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroImage from "../../../assets/heroimage.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-between h-[70vh] font-railway overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/*----------- Left side section-----------  */}
      <motion.div className="w-1/2 text-center p-8" variants={textVariants}>
        <motion.h2
          className="text-[3rem] font-sans font-light mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Latest Arrivals
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover our new collection of premium products
        </motion.p>

        <motion.button
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 hover:scale-95 hover:cursor-pointer transition-all"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>

      {/*------------ Right side section-----------  */}
      <motion.div className="w-1/2 h-full relative" variants={imageVariants}>
        <motion.img
          src={heroImage}
          alt="Latest fashion arrivals"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
