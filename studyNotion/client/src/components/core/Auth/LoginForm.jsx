/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import loginImage from "../../../assets/Images/login.webp";
import frameImage from "../../../assets/Images/frame.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../../schemas/Login.schema";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken } from "../../../redux/slices/authSlice";
import { setUser } from "../../../redux/slices/profileSlice";
import { useLoginMutation } from "../../../redux/apislices/authApiSlice";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  //------------- redux state and function --------------

  const { loading } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();


  //--------------- react-hook-form validation ----------------

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      accountType: "Student",
      email: "",
      password: "",
    },
  });

  const accountType = watch("accountType");

  const handleAccountTypeChange = (selectedAccountType) => {
    if (isSubmitting) return;
    setValue("accountType", selectedAccountType, { shouldValidate: true });
  };

  //------------------ form submit --------------------

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading.....");
    try {
      // console.log(data);
      // Simulate API call
      const response = await login(data).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("response of login user ", response);

      if (response.success) {
        toast.success(response.message);
        dispatch(setToken(response.token));
        dispatch(setUser(response.userObject));
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("user", JSON.stringify(response.userObject));

        // Cookies.set("user", JSON.stringify(response.userObject), {
        //   expires: 7,
        //   secure: true,
        //   sameSite: "strict",
        // });
      }

      console.log("login form response", response);
      // Handle login logic here
    } catch (error) {
      console.log("error", error);
      toast.error(error.data?.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center py-8 md:py-0 overflow-hidden font-inter"
        >
          <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center h-full gap-8 md:gap-0">
            {/* Left side form */}
            <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col gap-4 order-2 md:order-1">
              <div className="leading-6">
                <h3 className="font-semibold text-2xl sm:text-[1.6rem] text-white">
                  Welcome Back
                </h3>
                <i className="text-sm sm:text-[0.8rem] text-richblack-300">
                  Discover your passions,{" "}
                  <span className="text-blue-200">Be Unstoppable</span>
                </i>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Toggle Container */}
                <div className="relative flex items-center bg-richblack-800 rounded-full p-1 w-full sm:w-fit shadow-sm shadow-richblack-400">
                  <button
                    type="button"
                    onClick={() => handleAccountTypeChange("Student")}
                    disabled={loading}
                    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-sm sm:text-base ${
                      accountType === "Student"
                        ? "bg-richblack-900 text-white shadow-md"
                        : "text-richblack-200 hover:bg-richblack-700"
                    } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    Student
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAccountTypeChange("Instructor")}
                    disabled={loading}
                    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-sm sm:text-base ${
                      accountType === "Instructor"
                        ? "bg-richblack-900 text-white shadow-md"
                        : "text-richblack-200 hover:bg-richblack-700"
                    } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    Instructor
                  </button>
                </div>

                {/* Email address */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-richblack-300 text-sm sm:text-base"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                      <sup>*</sup>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-richblack-300 text-sm sm:text-base"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-white cursor-pointer text-lg"
                    >
                      {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                  </div>
                  <p className="flex items-center text-blue-200 hover:underline text-xs sm:text-[0.7rem] mt-1 justify-end font-semibold">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </p>
                  {errors.password && (
                    <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                      <sup>*</sup>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 sm:mt-6 w-full bg-yellow-200 text-black font-semibold py-2 sm:py-3 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base relative"
                >
                  {loading ? (
                    <>
                      <span className="invisible">Logging in...</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging in...
                      </span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>

            {/* Right side image - Hidden on mobile */}
            <div className="relative w-full md:w-6/12 flex justify-center items-center order-1 md:order-2 mb-6 md:mb-0">
              <img
                src={loginImage}
                alt="loginImage"
                className="hidden md:block absolute top-1/2 -translate-y-1/2 z-10 h-[300px] lg:h-[400px]"
              />
              <img
                src={frameImage}
                alt="frameImage"
                className="hidden md:block scale-125 lg:scale-150 h-[300px] lg:h-[400px]"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default LoginForm;
