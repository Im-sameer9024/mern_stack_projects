/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ isVisible, content, onClose, width = '640px' }) => {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50 
            flex items-center justify-center
            bg-black/30 backdrop-blur-sm 
          "
        >
          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{ width: `min(92vw, ${width})`, maxHeight: '90vh' }}
            className="
              bg-white/90 backdrop-blur-md
              p-5 rounded-xl shadow-xl
              border border-slate-200
              relative
              overflow-y-auto 
            "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-3 right-3
                bg-slate-100 hover:bg-slate-200
                p-1.5 rounded-full
                text-lg transition hover:cursor-pointer
              "
            >
              <IoCloseOutline />
            </button>

            {/* Content */}
            <div className="mt-4">{content}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
