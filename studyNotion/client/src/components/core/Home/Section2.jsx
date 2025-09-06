/* eslint-disable no-unused-vars */
import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { FaArrowRightLong } from 'react-icons/fa6'
import CodeBlockAnimation from '../../common/CodeBlockAnimation'
import { motion } from 'framer-motion'

const Section2 = () => {
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

  const codeBlock = {
    hidden: { opacity: 0, x: 50 },
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
    <div className="text-white w-11/12 mx-auto py-8 md:py-16 lg:py-24 flex flex-col items-center justify-center gap-12 md:gap-16 font-inter">
      {/*----------------------- section-1------------------- */}
      <motion.div 
        className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* left side section */}
        <motion.div 
          className="w-full md:w-[48%] space-y-6"
          variants={item}
        >
          <motion.h2 
            className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide"
            variants={item}
          >
            Unlock your <HighlightText text={"coding potential"} /> with our
            online courses.
          </motion.h2>

          <motion.p 
            className="text-richblack-200 text-base md:text-lg"
            variants={item}
          >
            Our courses are designed and taught by industry experts who have
            years of experience in coding and are passionate about sharing their
            knowledge with you.
          </motion.p>

          {/* buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={container}
          >
            <motion.div variants={item}>
              <CTAButton active={true} linkto={"/signup"}>
                Try it Yourself
                <FaArrowRightLong />
              </CTAButton>
            </motion.div>
            <motion.div variants={item}>
              <CTAButton active={false} linkto={"/login"}>
                Book a Demo
              </CTAButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* right side code block */}
        <motion.div 
          className="w-full md:w-[42%] bg-richblack-400 border border-richblack-500 backdrop-blur-2xl bg-opacity-30 rounded-xl relative mt-10 md:mt-0"
          variants={codeBlock}
        >
          <CodeBlockAnimation
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n/nav>`}
            codeColor={"text-richblack-100"}
          />
          <div className="w-72 h-64 rounded-full bg-gradient-to-br from-richblack-50 blur-2xl opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </motion.div>
      </motion.div>

      {/*------------------------ section-2---------------------- */}
      <motion.div 
        className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 mt-16 md:mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* left side code block */}
        <motion.div 
          className="w-full md:w-[48%] bg-richblack-400 border border-richblack-500 backdrop-blur-2xl bg-opacity-30 rounded-xl relative order-1 md:order-none"
          variants={codeBlock}
        >
          <CodeBlockAnimation
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n/nav>`}
            codeColor={"text-richblack-100"}
          />
          <div className="w-72 h-64 rounded-full bg-gradient-to-br from-blue-50 blur-2xl opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </motion.div>

        {/* right side section */}
        <motion.div 
          className="w-full md:w-[42%] space-y-6 order-2 md:order-none"
          variants={item}
        >
          <motion.h2 
            className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide"
            variants={item}
          >
            Start <HighlightText text={"coding in seconds"} />
          </motion.h2>

          <motion.p 
            className="text-richblack-200 text-base md:text-lg"
            variants={item}
          >
            Go ahead, give it a try. Our hands-on learning environment means
            you'll be writing real code from your very first lesson.
          </motion.p>

          {/* buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={container}
          >
            <motion.div variants={item}>
              <CTAButton active={true} linkto={"/signup"}>
                Continue Lesson
                <FaArrowRightLong />
              </CTAButton>
            </motion.div>
            <motion.div variants={item}>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section Footer */}
      <motion.div 
        className="w-full text-center mt-16 md:mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.h3 
          className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide mb-4"
          variants={item}
        >
          Unlock the <HighlightText text={"Power of Code"} />
        </motion.h3>
        <motion.p 
          className="text-richblack-200 text-base md:text-lg"
          variants={item}
        >
          Learn to Build Anything You Can Imagine
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Section2