import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdateProfileDetailsMutation } from "../../../redux/apislices/profileApiSlice";
import Cookie from "js-cookie";

const UpdateUserDetails = () => {
  const [updateProfile] = useUpdateProfileDetailsMutation();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      gender: user?.gender || "",
      about: user?.about || "",
      contactNumber: user?.contactNumber || "",
      dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
    },
  });

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      token: token,
    };

    console.log("data", newData);
    setIsLoading(true);
    try {
      const response = await updateProfile(newData).unwrap();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("response is here os Profile user update form", response);
      if (response.success) {
        toast.success("Profile updated successfully!");
        
        // Cookie.set("user", JSON.stringify(response?.profileData));
      }
      reset();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
      <h3 className="text-white text-lg font-medium mb-6">
        Profile Information
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Row - Gender and Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Field */}
          <div className="w-full">
            <label
              htmlFor="gender"
              className="block text-richblack-300 text-sm mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full bg-richblack-700 rounded-md p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-blue-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Contact Number Field */}
          <div className="w-full">
            <label
              htmlFor="contactNumber"
              className="block text-richblack-300 text-sm mb-1"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="tel"
              maxLength={10}
              placeholder="Enter your contact number"
              {...register("contactNumber", {
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="w-full bg-richblack-700 rounded-md p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-blue-200"
            />
            {errors.contactNumber && (
              <p className="text-red-400 text-xs mt-1">
                <sup>*</sup>
                {errors.contactNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Second Row - Date of Birth */}
        <div className="w-full">
          <label
            htmlFor="dateOfBirth"
            className="block text-richblack-300 text-sm mb-1"
          >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            placeholder="0x-0x-xxxx"
            {...register("dateOfBirth")}
            max={new Date().toISOString().split("T")[0]}
            className="w-full md:w-1/2 bg-richblack-700 rounded-md p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </div>

        {/* Third Row - About */}
        <div className="w-full">
          <label
            htmlFor="about"
            className="block text-richblack-300 text-sm mb-1"
          >
            About
          </label>
          <textarea
            id="about"
            placeholder="Write something about yourself....."
            {...register("about", {
              maxLength: {
                value: 250,
                message: "About cannot exceed 250 characters",
              },
            })}
            rows={3}
            className="w-full bg-richblack-700 rounded-md p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
          {errors.about && (
            <p className="text-red-400 text-xs mt-1">
              <sup>*</sup>
              {errors.about.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="w-full pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-6 py-2 bg-yellow-50 rounded-md text-richblack-900 font-medium transition-all duration-200 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-yellow-200 hover:scale-[1.02]"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
