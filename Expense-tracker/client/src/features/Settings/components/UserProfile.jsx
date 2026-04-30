import React, { useRef, useState } from "react";
import img from "../../../assets/images/auth.webp";
import {
  useGetUserDetails,
  useUpdateProfileImage,
} from "@/features/Auth/hooks/useAuth";

const UserProfile = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const {
    data: UserDetails,
    isPending: isUserDetailsPending,
    error: isUserDetailsError,
  } = useGetUserDetails();

  const { mutate: updateImage, isPending: isUpdatingImage } = useUpdateProfileImage();

  const user = UserDetails?.data;

  // 👉 Click image
  const handleImageClick = () => {
    if (isUpdatingImage) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 👉 Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    // Call API
    updateImage(formData, {
      onError: () => {
        setPreview(null);
      },
      onSettled: () => {
        e.target.value = "";
      },
    });
  };

  // 👉 Loading & error states
  if (isUserDetailsPending) return <p>Loading...</p>;
  if (isUserDetailsError) return <p>Error loading user</p>;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      
      {/* Profile Image */}
      <div className="relative cursor-pointer group" onClick={handleImageClick}>
        <img
          src={preview || user?.avatarUrl || img}
          alt="profile"
          className="size-28 rounded-full border object-cover sm:size-36 md:size-40"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
          {isUpdatingImage ? "Uploading..." : "Change"}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* User Info */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold">
          {user?.name || "No Name"}
        </h2>
        <p className="text-gray-500">
          {user?.email || "No Email"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;