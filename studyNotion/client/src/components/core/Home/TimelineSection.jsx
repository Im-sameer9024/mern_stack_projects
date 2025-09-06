/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skill",
    },
    {
        Logo: Logo4,
        heading: "Innovation",
        Description: "We stay ahead by embracing new technologies",
    },
];

const TimelineSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren",
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    const imageVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const statsVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "backOut"
            }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className='w-11/12 max-w-[1200px] mx-auto flex md:flex-row flex-col justify-between gap-10 py-12'
        >

            <motion.div className='md:w-[45%] w-full flex flex-col gap-8 relative'>
                {timeline.map((element, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className='flex flex-row gap-6 items-start'
                    >
                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full p-3 shadow-sm'>
                            <img src={element.Logo} alt='logo' className='w-full' />
                        </div>

                        <div>
                            <h2 className='font-semibold text-lg md:text-xl'>{element.heading}</h2>
                            <p className='text-base text-richblack-600'>{element.Description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                variants={imageVariants}
                className='md:w-[45%] w-full relative'
            >
                <img
                    src={timelineImage}
                    alt="timelineImage"
                    className='w-full h-auto shadow-lg rounded-lg object-cover'
                />

                <motion.div
                    variants={statsVariants}
                    className=' bg-caribbeangreen-700 absolute -bottom-4 w-full  md:hidden lg:flex flex flex-col md:flex-row text-white uppercase py-5 md:py-7  rounded-lg shadow-xl'
                >
                    <div className='flex flex-row gap-3 md:gap-5 items-center border-r border-caribbeangreen-300 px-5 md:px-7'>
                        <p className='text-2xl md:text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-xs md:text-sm'>Years of Experience</p>
                    </div>

                    <div className='flex gap-3 md:gap-5 items-center px-5 md:px-7'>
                        <p className='text-2xl md:text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-xs md:text-sm'>Types of Courses</p>
                    </div>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

export default TimelineSection