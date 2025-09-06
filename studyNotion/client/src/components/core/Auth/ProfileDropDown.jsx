import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setToken } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { setUser } from "../../../redux/slices/profileSlice";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("data i shere",user)

  const logoutHandler = async () => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Logging out...");
    navigate("/");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      Cookies.remove("user");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="relative font-inter group z-50  ">
      <div>
        <img
          src={user?.image}
          alt="profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>

      {/* Dropdown */}
      <ul className="absolute text-white hidden group-hover:flex flex-col gap-2 right-0 top-8 bg-richblack-800 border border-blue-700 px-2 py-4 rounded-md z-50 shadow-md min-w-[150px]">
        <Link
          to="/dashboard/my-profile"
          className="hover:bg-richblack-600 px-2 py-1 rounded-md transition"
        >
          Dashboard
        </Link>
        <button
          onClick={logoutHandler}
          className="hover:bg-richblack-600 px-2 py-1 rounded-md transition text-left"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
