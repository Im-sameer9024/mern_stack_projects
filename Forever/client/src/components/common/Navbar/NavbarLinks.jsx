import React from "react";
import { navLinks } from "../../../assets/data";
import { Link, useLocation } from "react-router-dom";

const NavbarLinks = () => {
  const location = useLocation();

  return (
    <div className=" md:flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center hidden ">
      {navLinks.map((link) => {
        return (
          <Link
            to={link.url}
            key={link.id}
            className={`font-railway ${
              location.pathname === link.url
                ? " text-pink-300 font-semibold"
                : null
            } `}
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
