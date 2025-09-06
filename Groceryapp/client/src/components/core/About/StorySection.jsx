/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../../../assets/assets";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <div className="py-24 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={assets.story_image}
                alt="Farm to table"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2020, GreenCart started with a simple mission: to make
              fresh, quality groceries accessible to everyone. What began as a
              small local initiative has grown into a trusted platform serving
              thousands of families.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in supporting local farmers, reducing food waste, and
              creating a sustainable food ecosystem that benefits both our
              customers and communities.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-lg font-semibold text-gray-700">
                Farm to Table Excellence
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
