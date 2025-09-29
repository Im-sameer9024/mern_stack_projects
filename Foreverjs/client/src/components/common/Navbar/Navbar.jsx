import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import MobileSidebar from "./MobileSidebar";
import SearchBar from "./SearchBar";
import NavbarIcons from "./NavbarIcons";
import Logo from "./Logo";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = !isSidebarOpen ? "hidden" : "unset";
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = "unset";
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const closeSearchBar = () => {
    setSearchBarVisible(false);
  };

  return (
    <>
      <nav className={`w-full px-2 sm:px-4 md:px-8 lg:px-12 py-2 flex items-center justify-between z-20 bg-white top-0 fixed `}>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <NavbarLinks />

        {/* Icons Section (Search, Cart, Login, Mobile Menu) */}
        <NavbarIcons
          isSidebarOpen={isSidebarOpen}
          searchBarVisible={searchBarVisible}
          onToggleSidebar={toggleSidebar}
          onToggleSearchBar={toggleSearchBar}
        />
      </nav>

      {/* Search Bar Component */}
      <SearchBar isVisible={searchBarVisible} onClose={closeSearchBar} />

      {/* Mobile Sidebar Component */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Navbar;
