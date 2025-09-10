/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaShieldAlt, 
  FaHeart, 
  FaAward,
  FaUsers,
  FaGlobe
} from "react-icons/fa";

const AboutPage = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: <FaRocket className="text-3xl text-pink-600" />,
      title: "Innovation",
      description: "Cutting-edge technology and modern solutions"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-pink-700" />,
      title: "Trust & Security",
      description: "Your data and transactions are always protected"
    },
    {
      icon: <FaHeart className="text-3xl text-pink-800" />,
      title: "Customer Love",
      description: "We prioritize customer satisfaction above all"
    },
    {
      icon: <FaAward className="text-3xl text-pink-600" />,
      title: "Quality",
      description: "Only the best products from trusted brands"
    },
    {
      icon: <FaUsers className="text-3xl text-pink-700" />,
      title: "Community",
      description: "Join thousands of satisfied customers worldwide"
    },
    {
      icon: <FaGlobe className="text-3xl text-pink-800" />,
      title: "Global Reach",
      description: "Serving customers across the globe"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ABOUT US
          </h1>
          <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 mb-20 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-pink-600">Forever</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Forever was born out of a passion for innovation and a desire to revolutionize 
              the way people shop online. Our journey began with a simple idea: to provide 
              a platform where customers can easily discover, explore, and purchase a wide 
              range of products from the comfort of their homes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Since our inception, we've worked tirelessly to curate a diverse selection of 
              high-quality products that cater to every taste and preference. From fashion 
              and beauty to electronics and home essentials, we offer an extensive collection 
              sourced from trusted brands and suppliers.
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="bg-pink-200 rounded-2xl overflow-hidden aspect-video">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-pink-800 text-6xl font-bold">FOREVER</span>
              </div>
            </div>
            <div className="absolute -inset-4 border-2 border-pink-100 rounded-2xl -z-10"></div>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-pink-100 rounded-2xl shadow-xl p-8 md:p-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
          </div>
          <p className="text-xl text-gray-700 text-center leading-relaxed max-w-4xl mx-auto">
            Our mission at Forever is to empower customers with choice, convenience, and confidence. 
            We're dedicated to providing a seamless shopping experience that exceeds expectations, 
            from browsing and ordering to delivery and beyond.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">WHY CHOOSE US</h2>
            <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-pink-100"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-pink-50 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "500+", label: "Products" },
            { number: "50+", label: "Brands" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              className="text-center p-6 bg-pink-100 rounded-xl shadow-md"
            >
              <div className="text-3xl md:text-4xl font-bold text-pink-700 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;