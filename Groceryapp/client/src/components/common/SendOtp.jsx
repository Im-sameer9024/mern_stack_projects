import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, MailCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useSignUpMutation } from "../../redux/apiSlices/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Define OTP validation schema - Numbers only
const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be 6 numbers" })
    .max(6, { message: "OTP must be 6 numbers" })
    .regex(/^\d{6}$/, { message: "OTP must contain only numbers" }),
});

const SendOtp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [SignUp] = useSignUpMutation();

  useEffect(() => {
    if (!signupData) {
      navigate("/register");
    }
  }, [navigate, signupData]);

  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("OTP submitted:", data.otp);

    const finalData = {
      ...signupData,
      otp: data.otp,
    };

    try {
      const response = await SignUp(finalData).unwrap();

      console.log("response of send otp ", response, "final data ", finalData);

      if (response?.success) {
        toast.success("User created successfully");
        navigate("/login");
      } else {
        navigate("/register");
        toast.error(response.data?.message || response?.message);
      }
    } catch (error) {
      console.log("error occur in signup user", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (value) => {
    // Allow only numbers - filter out any non-digit characters
    const numbersOnly = value.replace(/\D/g, "");

    // Limit to 6 digits
    const truncatedValue = numbersOnly.slice(0, 6);

    setOtpValue(truncatedValue);
    setValue("otp", truncatedValue, { shouldValidate: true });

    // Clear error when user starts typing
    if (errors.otp) {
      clearErrors("otp");
    }
    if (errors.root) {
      clearErrors("root");
    }
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP...");
    // Simulate resend OTP API call
    alert("New OTP has been sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center w-full p-4">
      <div className="w-full max-w-md">
        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
              <MailCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Root error message */}
          {errors.root && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">
                {errors.root.message}
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-6"
          >
            <div className="w-full flex flex-col items-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={handleOtpChange}
                className="justify-center"
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={`w-12 h-12 text-lg font-semibold border-2 ${
                        errors.otp ? "border-red-300" : "border-gray-300"
                      } rounded-lg transition-colors focus:border-green-500`}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {errors.otp && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isSubmitting || otpValue.length !== 6}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isSubmitting || otpValue.length !== 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend OTP Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline"
                  disabled={isSubmitting}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
