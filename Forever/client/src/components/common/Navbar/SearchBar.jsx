/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "../../ui/input";

const SearchBar = ({ isVisible, onClose }) => {
  // Searchbar animation variants
  const searchVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-4"
          initial="closed"
          animate="open"
          exit="closed"
          variants={searchVariants}
        >
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                className="w-full pl-4 pr-12 py-2 rounded-full"
                placeholder="Search products..."
                autoFocus
              />
              <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 "
                size={20}
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;