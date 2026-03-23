/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';

const NavbarSearch = ({ open, onClose }) => {
  const inputRef = useRef(null);

  // Focus input when open
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden'; // prevent scroll
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 🔥 Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-90"
            onClick={onClose}
          />

          {/* 🔍 Search Box */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-150 max-w-[90%] bg-richBlack-800 border border-richBlack-600 rounded-lg shadow-2xl p-6 z-100"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses..."
              className="w-full bg-transparent outline-none border-b-2 border-richBlack-600 focus:border-yellow-400 py-3 text-base"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavbarSearch;
