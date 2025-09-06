import React from "react";
import * as Icons from "react-icons/vsc";
// import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";
const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  //   const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50 "
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200 p-1 `}
    >
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
