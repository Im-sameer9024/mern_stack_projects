import { useState } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { LogOut } from "lucide-react";
import Modal from "../common/Modal";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLinkClick }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setOpenModal(false);
  };

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
    <div className="w-full h-[calc(100vh-64px)] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 pt-5">
      <div className="flex flex-col gap-2">
        {sidebarLinks.map((Link, index) => {
          if (Link.type && user?.accountType !== Link.type) return null;
          return (
            <SidebarLink
              key={index}
              link={Link}
              iconName={Link.icon}
              onClick={onLinkClick}
            />
          );
        })}
      </div>

      {/* Horizontal line */}
      <div className="mx-auto mt-6 mb-6 h-[1px] w-full bg-richblack-700" />

      <div className="flex flex-col gap-2">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
          onClick={onLinkClick}
        />
        <button
          onClick={(e) => handleOpenModal(e)}
          className="flex items-center py-1 gap-2 px-1 text-richblack-100 hover:bg-yellow-800 hover:text-yellow-50 transition-all duration-200"
        >
          <span>
            <LogOut size={18} />
          </span>
          LogOut
        </button>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div className="text-white flex flex-col gap-4">
          <h2 className="text-xl font-inter">Are you sure ?</h2>
          <p className="text-sm font-inter text-richblack-300">
            You will be logged out of your account
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={logoutHandler}
              className="bg-yellow-50 px-4 py-2 rounded-md text-richblack-900 font-inter hover:bg-yellow-300 transition-all duration-200 hover:scale-97"
            >
              Logout
            </button>
            <button
              onClick={(e) => handleCloseModal(e)}
              className="bg-richblack-700 px-4 py-2 rounded-md text-richblack-100 font-inter hover:bg-richblack-800 transition-all duration-200 hover:scale-97"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;