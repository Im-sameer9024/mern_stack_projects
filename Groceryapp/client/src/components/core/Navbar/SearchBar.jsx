import { SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { useSearchProductsQuery } from "../../../redux/apiSlices/productApiSlice";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce
  const navigate = useNavigate();

  // Use the RTK Query hook
  const { data, error, isLoading, isFetching } = useSearchProductsQuery(
    { q: debouncedSearchQuery },
    { skip: debouncedSearchQuery.length < 2 } // Skip query if search is too short
  );

  const products = data?.data || [];
  const hasResults = products.length > 0;

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowResults(true);
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/all-products/${productId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative font-content hidden lg:block search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="border border-gray-400 rounded-full px-4 py-1 outline-none w-full"
        onFocus={() => searchQuery.length > 0 && setShowResults(true)}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2">
        <SearchIcon size={18} />
      </span>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
          {isLoading || isFetching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error loading results
            </div>
          ) : searchQuery.length < 2 ? (
            <div className="p-4 text-center text-gray-500 ">
              Type at least 2 char
            </div>
          ) : !hasResults ? (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          ) : (
            <div className="py-2">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="flex items-center gap-3">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">
                        {product.productName}
                      </h4>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;