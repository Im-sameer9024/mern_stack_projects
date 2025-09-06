/* eslint-disable no-unused-vars */
import React from 'react'
import {motion} from 'framer-motion'
import { Leaf } from 'lucide-react';

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };


const HeroSection = () => {
  return (
     <div className="relative pt-16 md:pt-20 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-orange-50"></div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
              Get In
              <span className="text-green-500"> Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Have questions about our products or services? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              <span className="text-base md:text-lg font-semibold text-gray-700">Fresh Support, Always</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
  )
}

export default HeroSection
