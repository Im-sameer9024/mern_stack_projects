/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSendOtpMutation } from "../../redux/apiSlices/authApiSlice";
import { setLoading, setSignupData } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const SignupForm = () => {
  //---------------------------- value from authslice of redux -------------------
  const dispatch = useDispatch();
  const [SendOtp] = useSendOtpMutation();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    console.log(data);

    const itemId = toast.loading("Sending OTP...");
    const emailData = {
      email: data.email,
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await SendOtp(emailData).unwrap();
      // console.log("response of sendOtp", response);

      if (response?.success) {
        toast.success(response?.message, { id: itemId });
        navigate("/send-otp");
        dispatch(setSignupData(data));
      } else {
        toast.error(response?.message, { id: itemId });
        navigate("/signup");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: itemId,
        duration: 2000,
      });
      console.log("error occur in signupform ", error);
    } finally {
      dispatch(setLoading(false));
      // toast.dismiss(itemId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[450px] mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us and get started today</p>
        </div>

        <div className="space-y-4">
          {/*------------------ name field ------------- */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              disabled={loading}
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/*------------------ email field ------------- */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              disabled={loading}
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/*------------------- password field -------------- */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/*-------------- terms and conditions --------------------- */}
          <div className="flex items-start space-x-2 pt-2">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 mt-1"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-pink-600 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-pink-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.terms.message}
            </motion.p>
          )}

          {/*-------------- submit button --------------------- */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors hover:cursor-pointer"
            >
              {loading ? "Creating Account..." : " Create Account "}
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SignupForm;
