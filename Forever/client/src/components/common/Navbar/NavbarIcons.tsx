import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";

const NavbarIcons = ({openSidebar}:{openSidebar:()=>void}) => {
  return (
    <div className=" flex items-center gap-2">
      <Link to={"/cart"} className="hidden md:block">
        <span className=" w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer group">
          <FaBagShopping
            size={20}
            className=" group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </span>
      </Link>

      <Button className=" hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hidden md:block">
        Login
      </Button>

      <Button onClick={openSidebar} className=" hover:cursor-pointer block md:hidden">
        <Menu />
      </Button>
    </div>
  );
};

export default NavbarIcons;
