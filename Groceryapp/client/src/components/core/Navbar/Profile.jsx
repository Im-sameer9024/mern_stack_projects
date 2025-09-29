/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Mail, Loader2, Loader } from "lucide-react"; // Import Lucide icons
import {
  useLogoutUserMutation,
} from "../../../redux/apiSlices/authApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slices/authSlice";

const Profile = ({ user, isLoading, refetch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [LogoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await LogoutUser();

      localStorage.clear();
      dispatch(setToken(null));
      await refetch();

      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
      navigate("/");
      // Close dropdown
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error("Failed to log out", { id: toastId });
    }
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {/* Profile Trigger */}
      <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src={user?.image}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            {/* User Info Section */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "No email provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items - Only Logout */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors duration-150 group"
              >
                <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Account Type Badge */}
            {user?.accountType && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <span className="text-xs text-gray-500 capitalize">
                  {user.accountType} Account
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
