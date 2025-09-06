import { Link } from "react-router-dom";
import { links } from "../../../data/constant";

const AllLinks = ({ matchRoute, isMobile = false, onLinkClick, sidebar = false }) => {
  return (
    <>
      {links.map((item) => (
        <Link
          key={item.id}
          to={item.href}
          className={`transition-all duration-200 ease-in-out ${
            matchRoute(item.href) ? "text-green-500 font-medium" : "text-gray-700 hover:text-green-500"
          } ${isMobile ? "text-lg py-3 block" : ""} ${sidebar ? "py-2 block" : ""}`}
          onClick={onLinkClick}
        >
          {item.linkName}
        </Link>
      ))}
    </>
  );
};

export default AllLinks;