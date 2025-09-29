"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: { scale: 1.05 }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 max-w-[280px] w-full mx-auto"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          whileHover="hover"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? "bg-red-500 text-white" 
              : "bg-white/80 dark:bg-gray-800/80 text-gray-600 hover:bg-white dark:hover:bg-gray-700"
          }`}
        >
          <Heart 
            size={18} 
            className={isLiked ? "fill-current" : ""}
          />
        </button>

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Add to Cart Button - Shows on hover */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-32px)]"
          variants={buttonVariants}
          animate={isHovered ? "visible" : "hidden"}
        >
          <Button className="w-full bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Product Info Section */}
      <div className="p-4 space-y-2">
        {/* Product Title */}
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm sm:text-base leading-tight">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Mobile Add to Cart Button - Always visible on mobile */}
        <Button className="w-full bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 sm:hidden mt-2">
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;