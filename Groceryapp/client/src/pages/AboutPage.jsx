/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShoppingCart, Users, Award, Truck, Heart, Star, ArrowRight } from 'lucide-react';
import HeroSection from '../components/core/About/HeroSection';
import InfoSection from '../components/core/About/InfoSection';
import StorySection from '../components/core/About/StorySection';
import MarketValueSection from '../components/core/About/MarketValueSection';
import OurTeam from '../components/core/About/OurTeam';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  

  


  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
     <HeroSection/>

      {/* Info Section */}
      <InfoSection/>

      {/* Our Story Section */}
      <StorySection/>

      {/* Market Values Section */}
     <MarketValueSection/>

      {/* Team Section */}
      <OurTeam/>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-green-600">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust GreenCart for their daily grocery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Start Shopping
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5" />
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>
    </section>
  );
};

export default AboutPage;