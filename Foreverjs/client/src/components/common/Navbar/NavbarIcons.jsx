import React from "react";
import { FaBagShopping, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const NavbarIcons = ({
  isSidebarOpen,
  searchBarVisible,
  onToggleSidebar,
  onToggleSearchBar,
}) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("token", token);


  return (
    <div className="flex items-center gap-4">
      {/* Search button - hidden when search bar is visible */}
      {!searchBarVisible && (
        <button
          onClick={onToggleSearchBar}
          className="md:block hidden"
          aria-label="Open search"
        >
          <span className="hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full hover:scale-95 transition-all duration-300 ease-in-out hover:cursor-pointer">
            <Search size={24} />
          </span>
        </button>
      )}

      {/* Cart page */}
      <Link to={"/cart"}>
        <span className="hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full hover:scale-95 transition-all duration-300 ease-in-out">
          <FaBagShopping size={24} />
        </span>
      </Link>

      {token ? (
        <Profile />
      ) : (
        <Button
          onClick={() => navigate("/login")}
          variant="forever"
          className="hidden md:block"
        >
          Login
        </Button>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-full hover:bg-gray-200"
        onClick={onToggleSidebar}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default NavbarIcons;
