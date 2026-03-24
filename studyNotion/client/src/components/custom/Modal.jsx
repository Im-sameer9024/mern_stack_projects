/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

const Modal = ({ isVisible, content, width }) => {
  if (!isVisible) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-richBlack-800 p-4  w-[90%] ${width ? width : 'lg:w-[60%]'} rounded-lg max-h-[90vh] overflow-y-auto`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
