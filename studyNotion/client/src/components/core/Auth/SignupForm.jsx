import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import signupImage from "../../../assets/Images/signup.webp";
import frameImage from "../../../assets/Images/frame.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema } from "../../../schemas/Signup.schema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setSignupData } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useSendOtpMutation } from "../../../redux/apislices/authApiSlice";

const SignupForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //-------------- redux state and function --------------

  const{loading} = useSelector((state) => state.auth);
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //--------------- react-hook-form validation ----------------

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      accountType: "Student",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const accountType = watch("accountType");

  const handleAccountTypeChange = (selectedAccountType) => {
    if (isSubmitting) return;
    setValue("accountType", selectedAccountType, { shouldValidate: true });
  };

  //------------------- submit form ------------------

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...")
    try {
      console.log("Form data:", data);
      // Simulate API call

      const response = await sendOtp({ email: data.email }).unwrap();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.success) {
        navigate("/verify-email");
        dispatch(setSignupData(data));
      }
      console.log("response of Signup form ", response);
    } catch (error) {
      console.log("error", error);
      toast.error(error.data?.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

  

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center my-10 py-8 md:py-0 overflow-hidden font-inter">
      <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center h-full gap-8 md:gap-0">
        {/* Left side form */}
        <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col gap-4 order-2 md:order-1">
          <div className="leading-6">
            <h3 className="font-semibold text-2xl sm:text-[1.6rem] text-white">
              Join Us Today
            </h3>
            <i className="text-sm sm:text-[0.8rem] text-richblack-300">
              Start your learning journey,{" "}
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

            {/* Name Fields - Side by Side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="text-richblack-300 text-sm sm:text-base"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="text-richblack-300 text-sm sm:text-base"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.phone.message}
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
                  className="absolute top-1/2 right-2 text-white -translate-y-1/2  cursor-pointer text-lg"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-richblack-300 text-sm sm:text-base"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full bg-richblack-700 rounded-md p-2 sm:p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm sm:text-base"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-2 text-white -translate-y-1/2  cursor-pointer text-lg"
                >
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs sm:text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.confirmPassword.message}
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
                  <span className="invisible">Creating Account...</span>
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
                    Creating Account...
                  </span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Right side image - Hidden on mobile */}
        <div className="relative w-full md:w-6/12 flex justify-center items-center order-1 md:order-2 mb-6 md:mb-0">
          <img
            src={signupImage}
            alt="signupImage"
            className="hidden md:block absolute top-1/2 -translate-y-1/2 z-10 h-[300px] lg:h-[400px]"
          />
          <img
            src={frameImage}
            alt="frameImage"
            className="hidden md:block scale-125 lg:scale-150 h-[300px] lg:h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
