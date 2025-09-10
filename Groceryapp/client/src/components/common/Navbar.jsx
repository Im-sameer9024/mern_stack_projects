/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import AllLinks from "../core/Navbar/AllLinks";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../core/Navbar/SearchBar";
import Cart from "../core/Navbar/Cart";
import Profile from "../core/Navbar/Profile";
import { useSelector } from "react-redux";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import useLoginUser from "../../hooks/useLoginUser";
import { useGetCartDetailsQuery } from "../../redux/apiSlices/cartApiSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user,isLoading,isAuthenticated } = useLoginUser();
  const { data: cartData } = useGetCartDetailsQuery();

  const numberOfItems = cartData?.result?.data?.totalItems || 0;

  // console.log("number of items", numberOfItems);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <nav className="lg:px-8 md:px-6 px-4 py-4 flex items-center justify-between relative z-50 bg-white shadow-sm">
        {/*-------------- Logo is here ------------ */}
        <div className="lg:w-2/12 md:w-3/12 w-4/12">
          <img
            src={assets.logo}
            alt="logo"
            loading="lazy"
            className="w-24 md:w-32"
          />
        </div>

        {/*----------------- Desktop Navigation ----------------- */}
        <div className="lg:w-9/12 md:w-9/12 hidden md:flex font-content lg:gap-8 md:gap-6 gap-4 transition-all duration-300 items-center text-nowrap justify-between">
          <div className="flex gap-6">
            <AllLinks matchRoute={matchRoute} />
          </div>

          <div className="flex items-center gap-4">
            <SearchBar />
            <button onClick={() => navigate("/cart")} className=" relative">
              <span className=" absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full p-1 w-4 h-4 flex items-center justify-center">
                {numberOfItems}
              </span>
              <Cart />
            </button>
            {isAuthenticated ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 hover:scale-95 text-white rounded-md bg-green-400 hover:bg-green-500 transition-all duration-300"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {/*----------------- Mobile Menu Button ----------------- */}
        <div className="md:hidden flex items-center gap-4">
          <Cart />
          <button
            className="p-2 text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/*----------------- Mobile Menu Overlay ----------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl z-50 md:hidden flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              {/* Close button */}
              <div className="flex justify-end p-4 border-b">
                <button
                  className="p-2 text-gray-700 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-8">
                  <div className="flex flex-col gap-4">
                    <AllLinks
                      matchRoute={matchRoute}
                      isMobile={true}
                      sidebar={true}
                      onLinkClick={() => setIsMobileMenuOpen(false)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <SearchBar isMobile={true} />
                </div>

                <div className="flex flex-col gap-4">
                  {token ? (
                    <Profile isMobile={true} />
                  ) : (
                    <button className="w-full px-4 py-2 text-white rounded-md bg-green-400 hover:bg-green-500 transition-colors duration-300">
                      Log In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
