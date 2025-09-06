/* eslint-disable no-unused-vars */
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.section
        key="content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full overflow-hidden h-[calc(100vh-70px)] flex flex-row relative"
      >
        {/* Mobile Sidebar Toggle Button */}
        <button
          className={`lg:hidden fixed top-20 left-4 z-50   rounded-md bg-richblack-700 text-white  ${
            isSidebarOpen ? "p-0" : "p-2"
          } `}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? null : <Menu size={24} />}
        </button>

        {/* Sidebar - Responsive */}
        <motion.div
          className={`fixed lg:static z-40 w-[240px] lg:w-[14%] h-full bg-richblack-800 transition-all duration-300 ${
            isSidebarOpen ? "left-0" : "-left-full lg:left-0"
          }`}
        >
          <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
        </motion.div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="w-full lg:w-[86%] h-auto overflow-y-scroll">
          <Outlet />
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Dashboard;
