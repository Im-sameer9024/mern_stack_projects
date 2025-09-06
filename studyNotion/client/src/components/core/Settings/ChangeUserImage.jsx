import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUploadProfileImageMutation } from "../../../redux/apislices/profileApiSlice";
import toast from "react-hot-toast";
import { setUser } from "../../../redux/slices/profileSlice";
import Cookie from "js-cookie";
import { Upload } from "lucide-react";

const ChangeUserImage = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [uploadProfileImage] = useUploadProfileImageMutation();

  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (PNG, JPEG, JPG, GIF)");
      return;
    }

    // Validate file size (e.g., 2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setImageFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("displayPicture", imageFile); // Must match backend expectation
      formData.append("token", token);
      console.log("formdata", formData);
      // Add token if needed in headers (not in form data)
      const response = await uploadProfileImage(formData).unwrap();

      toast.success("Profile picture updated successfully!");
      console.log("response in image upload", response);

      // If your backend returns the updated image URL, you might want to update the preview
      if (response.success) {
        dispatch(setUser(response?.updatedProfile));
        // Cookie.set("user", JSON.stringify(response?.updatedProfile));
        setImagePreview(response.updatedProfile.image);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 px-4 py-6 rounded-md border border-richblack-700 bg-richblack-800">
      <img
        src={imagePreview || user?.image}
        alt={user?.firstName}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="flex flex-col gap-2">
        <h3>Change Profile Picture</h3>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/gif, image/jpeg, image/jpg"
          />
          <button
            onClick={triggerFileSelect}
            className="bg-richblack-700 px-4 py-1 rounded-md text-richblack-100 font-inter hover:bg-richblack-900 border-richblack-600 border transition-all duration-200 hover:scale-97 h-fit w-fit flex items-center gap-1"
          >
            Select
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || !imageFile}
            className={`bg-yellow-50 px-4 py-1 rounded-md text-richblack-900 font-inter transition-all duration-200 hover:scale-97 flex h-fit w-fit items-center gap-1 ${
              isUploading
                ? "opacity-70 hover:cursor-pointer cursor-not-allowed"
                : "hover:bg-yellow-300"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
            {!isUploading && <Upload size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserImage;
