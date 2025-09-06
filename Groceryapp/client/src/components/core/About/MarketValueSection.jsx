/* eslint-disable no-unused-vars */
import { Award, Heart, Leaf, Truck } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Fresh & Organic",
    description:
      "We source the freshest organic produce directly from local farms to ensure quality and sustainability.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Quality Assured",
    description:
      "Every product goes through rigorous quality checks to meet our high standards before reaching your doorstep.",
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Fast Delivery",
    description:
      "Same-day delivery service ensures your groceries arrive fresh and on time, every time.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Community First",
    description:
      "Supporting local farmers and communities while providing you with the best grocery shopping experience.",
  },
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

const MarketValueSection = () => {
  return (
    <div className="py-24 bg-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do, from sourcing to
            delivery
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-500">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketValueSection;
