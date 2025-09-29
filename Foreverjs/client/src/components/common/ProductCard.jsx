import React from "react";
import Product from "../../assets/heroimage.jpg";

const ProductCard = () => {
  return (
    <div className=" max-w-[250px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="w-full h-60 overflow-hidden relative">
        <img
          src={Product}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title - truncated to 2 lines */}
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
          Premium Quality Product Name That Extends
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-2xl font-bold text-gray-900">$89.99</span>

          {/* Add to Cart Button */}
          <button className="bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-all hover:cursor-pointer hover:scale-95 duration-300 ease-in-out">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
