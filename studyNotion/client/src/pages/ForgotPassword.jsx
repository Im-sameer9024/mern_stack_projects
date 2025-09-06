/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
// import { useDispatch, } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useResetPasswordTokenMutation } from "../redux/apislices/authApiSlice";
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

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [resetPasswordToken] = useResetPasswordTokenMutation();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Sending reset email...");
    try {
      // Dispatch the action to send reset token

      const response = await resetPasswordToken(data).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.success) {
        setEmailSent(true);
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
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            <p className="my-4 text-[0.9rem]  text-richblack-100">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                : `We have sent the reset email to ${watch("email")}`}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {!emailSent && (
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
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!emailSent
                  ? isSubmitting
                    ? "Sending..."
                    : "Submit"
                  : "Resend Email"}
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

export default ForgotPassword;
