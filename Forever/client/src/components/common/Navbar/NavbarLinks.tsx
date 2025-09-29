import { Link } from "react-router-dom";
import { navLinks } from "../../../constants/Data";

import type { Location } from "react-router-dom";

interface NavbarLInksProps {
  location: Location;
}

const NavbarLinks = ({ location }: NavbarLInksProps) => {
  return (
    <div className=" hidden md:flex gap-6 font-alan ">
      {navLinks.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          className={`${
            location.pathname === link.path ? "text-pink-300" : ""
          } transition-all duration-200 ease-in-out`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
