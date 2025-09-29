import { motion, type Variants } from 'framer-motion';
import { services } from '../../../constants/Data';

const ServicesSection = () => {
  

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants:Variants = {
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
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing the best shopping experience with our premium services
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-16"
        />

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, ) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              {/* Service Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 group-hover:from-blue-100 group-hover:to-indigo-200 transition-colors duration-300"
                >
                  <service.icon className="w-8 h-8 text-indigo-600" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16"
        />
      </div>
    </section>
  );
};

export default ServicesSection;