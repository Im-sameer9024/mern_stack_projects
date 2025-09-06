/* eslint-disable no-unused-vars */
import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { FaArrowRightLong } from 'react-icons/fa6'
import TimelineSection from './TimelineSection'
import LearningLanguageSection from './LearningLanguageSection'
import { motion } from 'framer-motion'

const Section3 = () => {
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

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-11/12 mx-auto py-12 md:py-24 flex flex-col items-center">
        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div variants={item}>
            <CTAButton active={true} linkto={"/signup"}>
              Explore Full Catalog
              <FaArrowRightLong />
            </CTAButton>
          </motion.div>
          <motion.div variants={item}>
            <CTAButton active={false} linkto={"/login"}>
              Learn More
            </CTAButton>
          </motion.div>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          className="w-full max-w-7xl flex flex-col md:flex-row justify-between gap-8 md:gap-12 my-12 md:my-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold md:w-[45%]"
            variants={item}
          >
            Get the Skills you need for a{" "}
            <HighlightText text="Job that is in demand" />
          </motion.h2>

          <motion.div 
            className="flex flex-col gap-6 md:gap-8 w-full md:w-[40%] items-start"
            variants={container}
          >
            <motion.p 
              className="text-sm sm:text-base md:text-lg"
              variants={item}
            >
              The modern StudyNotion is the dictates its own terms. Today, to
              be a competitive specialist requires more than professional
              skills.
            </motion.p>
            <motion.div variants={item}>
              <CTAButton active={true} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="w-full"
        >
          <TimelineSection />
        </motion.div>

        {/* Learning Language Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="w-full mt-12 md:mt-24"
        >
          <LearningLanguageSection />
        </motion.div>
      </div>
    </div>
  )
}

export default Section3