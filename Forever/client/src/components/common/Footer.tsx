import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#" },
        { name: "Products", href: "#" },
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Men", href: "#" },
        { name: "Women", href: "#" },
        { name: "Kids", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "New Arrivals", href: "#" }
      ]
    },
    {
      title: "Contact Info",
      links: [
        { 
          name: "123 Fashion Street, City, Country", 
          href: "#",
          icon: "💬"
        },
        { 
          name: "+1 (555) 123-4567", 
          href: "tel:+15551234567",
          icon: "💬"
        },
        { 
          name: "support@forever.com", 
          href: "mailto:support@forever.com",
          icon: "💬"
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <footer className="relative bg-transparent backdrop-blur-sm border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div
            variants={textVariants}
            className="lg:col-span-1"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              FOREVER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-700 leading-relaxed max-w-md"
            >
              We provide high-quality products and exceptional customer service. Your satisfaction is our priority.
            </motion.p>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="space-y-4"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-gray-900 uppercase tracking-wider"
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.1) + (linkIndex * 0.05) + 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ 
                        x: 5,
                        color: "#4f46e5",
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 group"
                    >
                      {link.icon && (
                        <span className="text-sm opacity-80 group-hover:scale-110 transition-transform duration-200">
                          {link.icon}
                        </span>
                      )}
                      <span className="text-base">{link.name}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm"
          >
            © {currentYear} FOREVER. All rights reserved.
          </motion.p>

          {/* Social Links or Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ 
                  scale: 1.05,
                  color: "#4f46e5"
                }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;