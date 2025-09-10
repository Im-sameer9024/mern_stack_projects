/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { 
  FaExchangeAlt, 
  FaUndo, 
  FaHeadset, 
  FaTruck,
  FaShieldAlt,
  FaAward,
  FaStackExchange
} from "react-icons/fa";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      icon: <FaExchangeAlt className="text-3xl" />,
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy",
      icon: <FaUndo className="text-3xl" />,
      color: "text-green-600"
    },
    {
      id: 3,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
      icon: <FaHeadset className="text-3xl" />,
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
      icon: <FaTruck className="text-3xl" />,
      color: "text-orange-600"
    },
    {
      id: 5,
      title: "Secure Payments",
      description: "Your payments are safe and secure",
      icon: <FaShieldAlt className="text-3xl" />,
      color: "text-red-600"
    },
    {
      id: 6,
      title: "Quality Guarantee",
      description: "We guarantee the quality of all products",
      icon: <FaAward className="text-3xl" />,
      color: "text-yellow-600"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best shopping experience with our premium services
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className={`w-16 h-16 rounded-full bg-opacity-20 flex items-center justify-center mb-4 ${service.color} ${service.color.replace('text', 'bg')} bg-opacity-20`}
                variants={iconVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;