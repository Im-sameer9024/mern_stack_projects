/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import AboutSection5 from "../components/core/About/AboutSection5";

const ContactPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // delay between each child animation
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        <motion.section
          key="content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full overflow-hidden"
        >
          <AboutSection5 />
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default ContactPage;
