/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../redux/apiSlices/authApiSlice";
import { setLoading } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const OtpForm = () => {
  //------------------------value from auth api slice and redux---------------

  const dispatch = useDispatch();
  const { signupData, loading } = useSelector((state) => state.auth);
  const [Signup] = useSignupMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  // Register the OTP field manually since we're using a custom component
  useEffect(() => {
    register("otp", {
      required: "OTP is required",
      minLength: {
        value: 6,
        message: "OTP must be 6 digits",
      },
      maxLength: {
        value: 6,
        message: "OTP must be 6 digits",
      },
      pattern: {
        value: /^\d+$/,
        message: "OTP must contain only numbers",
      },
    });
  }, [register]);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const handleOtpChange = (value) => {
    setValue("otp", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log("OTP submitted:", data);

    dispatch(setLoading(true));
    const itemId = toast.loading("Verifying OTP...");
    const finalData = {
      ...signupData,
      otp: parseInt(data?.otp),
    };
    try {
      const response = await Signup(finalData).unwrap();
      // console.log("resposne of signup in otp form ", response);

      if (response?.success) {
        toast.success(response?.message, { id: itemId });
        navigate("/login");
      } else {
        toast.error(response?.message, { id: itemId });
        navigate("/send-otp");
      }
    } catch (error) {
      console.log("error occur in otp form ", error);
      toast.error(error.data?.message, { id: itemId,duration:2000 });
    } finally {
      dispatch(setLoading(false));
      // toast.dismiss(itemId);
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    // Handle resend OTP logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Verification Code
          </h2>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="space-y-6">
          {/* OTP Input Field */}
          <div className="space-y-2">
            <Label
              htmlFor="otp"
              className="text-sm font-medium block text-center"
            >
              Verification Code
            </Label>

            <div className="flex justify-center">
              <InputOTP
                id="otp"
                disabled={loading}
                maxLength={6}
                value={otpValue}
                onChange={handleOtpChange}
                onComplete={() => trigger("otp")}
                className={errors.otp ? "border-red-500" : ""}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      disabled={loading}
                      key={index}
                      index={index}
                      className="w-12 h-12 text-lg border-gray-300"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errors.otp && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs mt-1 text-center"
              >
                {errors.otp.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </motion.div>

          {/* Resend OTP Section */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-pink-600 font-medium hover:underline focus:outline-none"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              to="/support"
              className="text-pink-600 font-medium hover:underline"
            >
              Contact support
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default OtpForm;
