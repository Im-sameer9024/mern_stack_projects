/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";

const MobileSidebar = ({ isOpen, onClose, currentPath }) => {
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  // Sidebar animation variants
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Backdrop animation variants
  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 0.6,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Navigation items
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/collection", label: "Collection" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="flex flex-col h-full font-railway">
              {/* Close button */}
              <div className="flex justify-end mb-8 p-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200"
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Mobile navigation links */}
              <nav className="flex flex-col space-y-6 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-xl transition-colors active:underline hover:bg-gray-300 p-2 ${
                      currentPath === item.path
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile buttons */}
              <div className="pt-8 border-t border-gray-200 space-y-6 px-2">
                <Button
                  onClick={handleCart}
                  variant="forever"
                  className="w-full"
                >
                  Cart
                </Button>
                <Button
                  onClick={handleLogin}
                  variant="forever"
                  className="w-full"
                >
                  Login
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
