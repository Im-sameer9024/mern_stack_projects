import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full relative font-content hidden lg:block">
      <input
        type="text"
        className=" border border-gray-400 rounded-full px-4  py-1 outline-none w-full"
      />
      <span className=" absolute right-2 top-1/2 -translate-y-1/2">
        <SearchIcon size={18} />
      </span>
    </div>
  );
};

export default SearchBar;
