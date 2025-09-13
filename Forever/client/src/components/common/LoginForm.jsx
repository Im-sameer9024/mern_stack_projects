/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/apiSlices/authApiSlice";
import { setLoading } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const LoginForm = () => {
  //----------------value from redux ----------------------
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [Login] = useLoginMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const itemId = toast.loading("Logging in...");
    try {
      //-------------------waiting for a min for loading-----------------
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //----------------api calling -----------------
      const response = await Login(data).unwrap();
      console.log("response of login form ", response);

      //---------------response ----------------
      if (response?.success) {
        localStorage.setItem("token", response?.token);
        toast.success(response?.message, { id: itemId });
        navigate("/");
      } else {
        toast.error(response?.message, { id: itemId });
        navigate("/login");
      }
    } catch (error) {
      console.log("error occur in login form ", error);
      toast.error(error.data?.message || "Something went wrong", { id: itemId,duration:2000 });
    } finally {
      dispatch(setLoading(false));
      // toast.dismiss(itemId);
    }
    // Handle login logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[450px]  mx-auto "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          {/*------------------ email fields ------------- */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              disabled={loading}
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

          {/*------------------- password fields -------------- */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              disabled={loading}
              placeholder="Enter your password"
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

          {/*-------------- forgot password link --------------------- */}
          <div className=" flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors hover:cursor-pointer"
            >
              {loading ? "Sign In..." : "Sign In"}
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
