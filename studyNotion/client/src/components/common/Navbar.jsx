/* eslint-disable no-unused-vars */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo, useCallback } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useGetAllCategoriesQuery } from "../../redux/apislices/categoryApiSlice";
import { useGetUserDetailsQuery } from "../../redux/apislices/profileApiSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const { token, signupData } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile, shallowEqual);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const { data: Details } = useGetUserDetailsQuery();
  const { data: Categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();

  console.log("categoriess", Categories);

  // console.log("date",Details)

  useEffect(() => {
    if (Details) {
      dispatch(setUser(Details?.userDetails));
    }
  }, [Details, dispatch]);

  // console.log("token,signupData",token,signupData)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const matchRoute = (route) => {
    // Return false immediately if route is undefined or empty
    if (!route) return false;

    // Safely check if the current path matches the route
    try {
      return matchPath({ path: route }, location.pathname);
    } catch (error) {
      console.error("Route matching error:", error);
      return false;
    }
  };
  return (
    <header
      className={` w-full transition-all duration-300 ${
        isScrolled
          ? "bg-richblack-900/95 backdrop-blur-sm border-b border-richblack-700"
          : "bg-richblack-900 border-b border-richblack-700"
      } z-50`}
    >
      <div className="w-11/12 mx-auto max-w-7xl flex justify-between items-center py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="StudyNotion Logo"
            className="h-8 md:h-9 w-auto"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {NavbarLinks.map((link, i) => (
              <li key={i}>
                {link.title === "Catalog" ? (
                  <div className="relative group">
                    <button
                      className={`flex items-center gap-1 ${
                        matchRoute(link.path)
                          ? "text-yellow-200"
                          : "text-richblack-100 hover:text-yellow-200"
                      } transition-colors duration-200`}
                    >
                      {link.title}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-48 bg-richblack-800 text-richblack-5 rounded-md shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-richblack-600">
                        {isCategoriesLoading ? (
                          <div>
                            <Loader2/>
                          </div>
                        ) : (
                          <div className="flex flex-col p-2">
                            {Categories?.allCategories.map((category, i) => (
                              <Link
                              key={i}
                                to={`/courses/${category?.name?.toLowerCase()}`}
                                className="px-4 py-2 hover:bg-richblack-700 rounded-md transition-colors"
                              >
                                {category?.name}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`${
                      matchRoute(link.path)
                        ? "text-yellow-200 font-medium"
                        : "text-richblack-100 hover:text-yellow-200"
                    } transition-colors duration-200`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/*----------- login and SignUp button ------------- */}
        <div className=" flex items-center gap-4">
          {user && user?.accountType !== "Instructor" && (
            <Link
              to={"/dashboard/cart"}
              className="relative text-white hidden md:block"
            >
              <FaCartShopping className="  text-[1.3rem]" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link
              to={"/login"}
              className=" hidden md:block border border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 text-white ease-in-out hover:scale-97"
            >
              Log In
            </Link>
          )}

          {token === null && (
            <Link
              to={"/signup"}
              className=" md:block  hidden border text-white border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97"
            >
              Sign Up
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        <button
          className="md:hidden text-richblack-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FiX size={24} className="text-white" />
          ) : (
            <FiMenu size={24} className="text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-30 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-richblack-800 z-40 shadow-2xl overflow-y-auto"
              >
                {/* Close Button Header */}
                <div className="sticky top-0 bg-richblack-800 z-10 p-4 flex justify-between items-center border-b border-richblack-700">
                  <img
                    src={logo}
                    alt="StudyNotion Logo"
                    className="h-7 w-auto"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-richblack-700 transition-colors"
                    aria-label="Close menu"
                  >
                    <FiX size={24} className="text-white" />
                  </button>
                </div>

                {/* Menu Content */}
                <div className="p-6">
                  <ul className="flex flex-col gap-4">
                    {NavbarLinks.map((link, i) => (
                      <li key={i}>
                        {link.title === "Catalog" ? (
                          <details className="group">
                            <summary className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-richblack-700 cursor-pointer">
                              <span className="text-richblack-5 font-medium">
                                {link.title}
                              </span>
                              <span className="transition-transform group-open:rotate-180">
                                ▼
                              </span>
                            </summary>
                            <div className="pl-4 mt-1 flex flex-col gap-2">
                              <Link
                                to="/courses/python"
                                className="py-2 px-2 rounded-lg hover:bg-richblack-700 text-richblack-100"
                              >
                                Python
                              </Link>
                              <Link
                                to="/courses/javascript"
                                className="py-2 px-2 rounded-lg hover:bg-richblack-700 text-richblack-100"
                              >
                                JavaScript
                              </Link>
                            </div>
                          </details>
                        ) : (
                          <Link
                            to={link.path}
                            className={`block py-3 px-2 rounded-lg ${
                              matchRoute(link.path)
                                ? "bg-richblack-700 text-yellow-200 font-medium"
                                : "hover:bg-richblack-700 text-richblack-5"
                            }`}
                          >
                            {link.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Auth Section */}
                  <div className="mt-8 pt-6 border-t border-richblack-700">
                    {user && user?.accountType !== "Instructor" && (
                      <Link
                        to="/dashboard/cart"
                        className="flex items-center gap-3 py-3 px-4 rounded-lg bg-richblack-700 mb-4"
                      >
                        <AiOutlineShoppingCart size={20} />
                        <span>Cart</span>
                        {totalItems > 0 && (
                          <span className="ml-auto bg-yellow-200 text-richblack-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    )}

                    {token === null ? (
                      <div className="flex flex-col gap-3">
                        <Link
                          to="/login"
                          className="py-3 px-4 text-center rounded-lg border border-richblack-600 bg-richblack-700 text-richblack-5"
                        >
                          Log In
                        </Link>
                        <Link
                          to="/signup"
                          className="py-3 px-4 text-center rounded-lg bg-yellow-200 text-richblack-900 font-medium"
                        >
                          Sign Up
                        </Link>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <ProfileDropDown />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
