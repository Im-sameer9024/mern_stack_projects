/* eslint-disable no-unused-vars */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";
import { motion, useInView } from "framer-motion";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-richblack-800 rounded-full flex items-center justify-center shadow-md hover:bg-richblack-700 transition-all duration-300 group"
      aria-label="Next review"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white group-hover:text-yellow-400 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-richblack-800 rounded-full flex items-center justify-center shadow-md hover:bg-richblack-700 transition-all duration-300 group"
      aria-label="Previous review"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white group-hover:text-yellow-400 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};


const ReviewSlider = () => {
   const ref = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          arrows: false,
        },
      },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };


  const reviews = [
    {
      id: 1,
      quote: "This platform transformed my learning experience. Highly recommended!",
      author: "Alex Johnson",
      role: "Web Developer",
    },
    {
      id: 2,
      quote: "The courses are well-structured and the instructors are knowledgeable.",
      author: "Sarah Miller",
      role: "UX Designer",
    },
    {
      id: 3,
      quote: "I've tried many platforms, but this one stands out for its quality.",
      author: "Michael Chen",
      role: "Data Scientist",
    },
    {
      id: 4,
      quote: "Perfect balance of theory and practical exercises.",
      author: "Emma Davis",
      role: "Mobile Developer",
    },
    {
      id: 5,
      quote: "The community support is exceptional. Never felt alone in my learning journey.",
      author: "David Wilson",
      role: "DevOps Engineer",
    },
    {
      id: 6,
      quote: "Worth every penny. The investment paid off in my career growth.",
      author: "Priya Patel",
      role: "Product Manager",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full max-w-6xl mx-auto px-12 py-12 md:py-16 lg:py-20 relative"
    >
      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="px-2 focus:outline-none"
          >
            <div className="bg-richblack-800 hover:bg-richblack-700 transition-all duration-300 p-6 rounded-xl h-64 flex flex-col justify-between shadow-lg border border-richblack-600">
              <p className="text-lg text-richblack-50 italic">"{review.quote}"</p>
              <div className="mt-4">
                <p className="font-bold text-white">{review.author}</p>
                <p className="text-richblack-300 text-sm">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default ReviewSlider;