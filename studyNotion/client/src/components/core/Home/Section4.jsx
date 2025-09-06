/* eslint-disable no-unused-vars */
import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { FaArrowRightLong } from 'react-icons/fa6'
import ReviewSlider from './ReviewSlider'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { motion } from 'framer-motion'

const Section4 = () => {
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
  }

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
  }

  const imageItem = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="w-full bg-richblack-900 min-h-screen font-inter text-white">
      <div className="w-11/12 mx-auto py-12 md:py-24">
        {/* Instructor Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between w-full gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Left side image */}
          <motion.div 
            className="w-full md:w-[45%] rounded-xl overflow-hidden shadow-2xl shadow-richblack-400"
            variants={imageItem}
          >
            <img 
              src={Instructor} 
              alt="Instructor teaching" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right side content */}
          <motion.div 
            className="w-full md:w-[45%] flex flex-col gap-6"
            variants={container}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold"
              variants={item}
            >
              Become an <HighlightText text={"Instructor"} />
            </motion.h3>
            
            <motion.p 
              className="text-richblack-200 text-base md:text-lg"
              variants={item}
            >
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </motion.p>

            <motion.div variants={item}>
              <CTAButton active={true} linkto={"/signup"}>
                Start Teaching Today
                <FaArrowRightLong />
              </CTAButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div 
          className="mt-24 flex flex-col items-center gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center"
            variants={item}
          >
            Reviews From Other Learners
          </motion.h3>
          
          <motion.div 
            className="w-full"
            variants={item}
          >
            <ReviewSlider />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Section4