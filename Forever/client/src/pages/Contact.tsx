import { motion, type Variants } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="px-2 sm:px-4 md:px-6 lg:px-10 py-3 lg:mt-16 md:mt-10 sm:mt-6 mt-4">
      {/* Main Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in <span className="text-pink-600">Touch</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you. Send us a message!
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-pink-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/*----------------- Left Side - Contact Information ----------------*/}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Information Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-pink-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              Contact Information
            </h2>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-pink-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Our Location</p>
                  <p className="text-gray-600 mt-1">
                    54709 Willms Station
                    <br />
                    Suite 350, Washington, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="text-pink-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone Number</p>
                  <p className="text-gray-600 mt-1">(415) 555-0132</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-pink-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-gray-600 mt-1">admin@forever.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md p-8 border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/*-------------------- Name ------------------- */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/*-------------------- Email ------------------- */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/*-------------------- Message ------------------- */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                ></textarea>
              </div>

              {/*-------------------- Submit Button ------------------- */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3.5 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Send Message
                <FaPaperPlane className="ml-2 text-sm" />
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
