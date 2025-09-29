import { useLocation } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import SearchBar from "./SearchBar";
import NavbarIcons from "./NavbarIcons";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbar, setNavbar] = useState("bg-transparent");
  const[searchBarVisible,setSearchBarVisible]=useState(false);

  const location = useLocation();

  const toggleSearchBar=()=>{
    setSearchBarVisible(!searchBarVisible);

  }

  const closeSearchBar=()=>{
    setSearchBarVisible(false);
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 0) {
        setNavbar("bg-white shadow-md");
      } else {
        setNavbar("bg-transparent");
      }
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <nav
      className={`px-2 sm:px-4 md:px-6 lg:px-10 py-3 flex justify-between items-center fixed top-0 w-full z-10 ${navbar} transition-all duration-300 ease-in-out`}
    >
      {/*------------------- logo section ------------------ */}
      <div className=" font-Montserrat font-bold lg:text-2xl md:text-xl text-lg text-[#4F4F4F]">
        <h1>FOREVER</h1>
      </div>

      {/*------------------- Navbar Links --------------- */}
      <NavbarLinks location={location} />

      <div className="flex items-center gap-2  ">
        {/*-------------------- Searchbar ---------------- */}

        <SearchBar onClose={closeSearchBar} isVisible={searchBarVisible} onToggleSearchBar={toggleSearchBar} />

        {/*------------------- Navbar icons ------------------ */}
        <NavbarIcons openSidebar={openSidebar} />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        currentPath={location.pathname}
      />
    </nav>
  );
};

export default Navbar;
