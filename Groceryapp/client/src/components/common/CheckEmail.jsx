import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, ShoppingCart } from "lucide-react";
import { loginSchema } from "../../validation/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlices/authApiSlice";

import { FaArrowLeftLong } from "react-icons/fa6";

// Define login schema

const CheckEmail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [Login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center w-full p-4 ">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Check Email
            </h1>
            <p className="text-gray-600">
              We have sent the reset email to youremailaccount@gmail.co
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Resending...
                </div>
              ) : (
                "Resend Email"
              )}
            </button>

            <div className=" flex items-center gap-2 text-gray-500 hover:underline group ">
              <span className=" group-hover:-translate-x-1 transition-all duration-200 ease-in-out">
                <FaArrowLeftLong />
              </span>
              <Link to={"/login"}>Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
