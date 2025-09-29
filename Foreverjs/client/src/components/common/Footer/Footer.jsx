import React from "react";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold">FOREVER</h3>
            <p className="text-gray-400 leading-relaxed">
              We provide high-quality products and exceptional customer service. 
              Your satisfaction is our priority.
            </p>
            <motion.div className="flex space-x-4">
              {[
                { icon: FaFacebookF, color: "hover:text-blue-500" },
                { icon: FaTwitter, color: "hover:text-blue-400" },
                { icon: FaInstagram, color: "hover:text-pink-500" },
                { icon: FaLinkedinIn, color: "hover:text-blue-600" }
              ].map((SocialIcon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-700"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <SocialIcon.icon className={`text-white ${SocialIcon.color}`} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Products", "About", "Contact", "FAQ"].map((link, index) => (
                <motion.li key={index} variants={linkVariants} whileHover="hover">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {["Men", "Women", "Kids", "Accessories", "New Arrivals"].map((category, index) => (
                <motion.li key={index} variants={linkVariants} whileHover="hover">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {category}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaMapMarkerAlt className="text-xl" />
                <span>123 Fashion Street, City, Country</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-xl" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-xl" />
                <span>support@forever.com</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div 
          className="mt-16 p-6 bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h4>
              <p className="text-gray-400">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex-1 w-full">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FOREVER. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Returns & Refunds
            </motion.a>
          </div>
        </motion.div>

        {/* Made with love */}
        <motion.div 
          className="mt-6 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> by FOREVER Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;