import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center w-fit text-sm px-6 py-3  !rounded-md font-bold shadow-sm shadow-richblack-600
        ${
          active
            ? "bg-yellow-50 text-black"
            : " bg-richblack-800 hover:bg-richblack-900 text-white"
        }
        hover:scale-97 transition-all duration-200 flex items-center gap-2
        `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
