/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import HighlightText from "../../common/HighlightText";
import CTAButton from "../../common/CTAButton";

const AboutSection4 = () => {
  const LearningGridArray = [
    {
      id: -1,
      title: "World-Class Learnings for",
      hightLightText: "Anyone, Anywhere",
      des: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      btnText: "Learn More",
      btnLink: "/",
    },
    {
      id: 1,
      title: "Curriculum Based on Industry Needs",
      des: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      id: 2,
      title: "Our Learning Methods",
      des: "The learning process uses the namely online and offline.",
    },
    {
      id: 3,
      title: "Certification",
      des: "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      id: 4,
      title: "Rating 'Auto-grading'",
      des: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      id: 5,
      title: "Ready to Work",
      des: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-richblack-900">
      <div className="w-11/12 mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {LearningGridArray.map((card, i) => (
            <motion.div
              key={card.id}
              variants={item}
              className={`rounded-xl overflow-hidden ${
                card.id === -1
                  ? "xl:col-span-2 bg-richblack-800"
                  : card.id % 2 === 1
                  ? "bg-richblack-700"
                  : "bg-richblack-800"
              } ${card.id === 3 && "xl:col-start-2"}`}
            >
              {card.id === -1 ? (
                <div className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {card.title}
                      <br />
                      <HighlightText text={card.hightLightText} />
                    </h2>
                    <p className="text-richblack-300 text-sm md:text-base mb-6">
                      {card.des}
                    </p>
                  </div>
                  <div className="w-fit">
                    <CTAButton active={true} linkto={card.btnLink}>
                      {card.btnText}
                    </CTAButton>
                  </div>
                </div>
              ) : (
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-richblack-5 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-richblack-300 text-sm md:text-base">
                    {card.des}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection4;