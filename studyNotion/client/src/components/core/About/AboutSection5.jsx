/* eslint-disable no-unused-vars */
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useContactUsMutation } from "../../../redux/apislices/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const AboutSection5 = () => {
  const dispatch = useDispatch();
  const [ContactUs] = useContactUsMutation();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Message Sending...");
    try {
      const response = await ContactUs(data).unwrap();

      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log("error occur");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
    // Add your form submission logic here
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-richblack-800 py-16 lg:py-24">
      <div className="w-11/12 mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Left Side - Form */}
          <motion.div className="w-full lg:w-1/2" variants={item}>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              variants={item}
            >
              Get in Touch
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              variants={item}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={container}
              >
                {/* First Name */}
                <motion.div variants={item}>
                  <label
                    htmlFor="firstName"
                    className="text-richblack-300 text-sm sm:text-base"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters required",
                      },
                    })}
                    className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                      <sup>*</sup>
                      {errors.firstName.message}
                    </p>
                  )}
                </motion.div>

                {/* Last Name */}
                <motion.div variants={item}>
                  <label
                    htmlFor="lastName"
                    className="text-richblack-300 text-sm sm:text-base"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters required",
                      },
                    })}
                    className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                      <sup>*</sup>
                      {errors.lastName.message}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Email */}
              <motion.div variants={item}>
                <label
                  htmlFor="email"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div variants={item}>
                <label
                  htmlFor="message"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                  })}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.message.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div className="pt-2 flex justify-center items-center" variants={item}>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 sm:mt-6 w-1/2 bg-yellow-200 text-black font-semibold py-2 sm:py-3 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base relative"
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
                          Message Sending....
                        </span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Right Side - Optional Content */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            variants={item}
          >
            <div className="bg-richblack-700 rounded-xl p-8 h-full w-full flex items-center justify-center">
              <p className="text-richblack-100 text-center text-lg">
                We'd love to hear from you! <br />
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection5;
