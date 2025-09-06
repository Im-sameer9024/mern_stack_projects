/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
// import { useDispatch, } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useResetPasswordMutation } from "../redux/apislices/authApiSlice";
import toast from "react-hot-toast";

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

function UpdatePassword() {
  
  const [resetPassword] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const { token } = useParams();
  console.log("params", token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Sending reset email...");

    const finalData = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: String(token),
    };

    try {
      // Dispatch the action to send reset token

      const response = await resetPassword(finalData).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.success) {
        toast.update(toastId, {
          render: "Reset email sent!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
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
          className="grid min-h-[calc(100vh-5rem)] place-items-center"
        >
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              Choose new password
            </h1>
            <p className="my-4 text-[0.9rem]  text-richblack-100">
              Almost done. Enter your new password and youre all set.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-2">
              {/*--------------------- New Password ------------------ */}

              <div>
                <label
                  htmlFor="email"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/*---------------- Confirm new Password --------------------- */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  Confirm new Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-50 transition-colors">
                  <BiArrowBack /> Back To Login
                </p>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default UpdatePassword;
