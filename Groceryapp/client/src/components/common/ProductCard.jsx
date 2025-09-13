/* eslint-disable no-unused-vars */
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAverageRatingQuery } from "../../redux/apiSlices/ratingApiSlice";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import {
  useAddToCartMutation,
  useGetCartDetailsQuery,
} from "../../redux/apiSlices/cartApiSlice";
import toast from "react-hot-toast";

const ProductCard = ({ singleProduct, index }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data, isLoading, isError } = useGetAverageRatingQuery(
    singleProduct._id
  );

  const [AddToCart] = useAddToCartMutation();
  const { refetch } = useGetCartDetailsQuery();

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await AddToCart({ productId, quantity }).unwrap();
      console.log("response ", response);

      if (response?.result?.success) {
        refetch();
        toast.success(response.result?.message);
      } else {
        toast.error(response.result?.message);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "#4ADE80",
      color: "white",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="border border-gray-200 rounded-lg p-3 font-content flex flex-col justify-between bg-white overflow-hidden"
    >
      <Link to={`/all-products/${singleProduct?._id}`}>
        {/*--------------------- image section is here ------------- */}
        <motion.div
          variants={imageVariants}
          className="overflow-hidden rounded-md mb-3"
        >
          <img
            src={singleProduct?.images?.[0]}
            alt="product image"
            className="w-full h-48 object-cover transition-all duration-300 ease-in-out"
          />
        </motion.div>

        <div className="flex flex-col leading-tight mb-3">
          {/* product name  */}
          <h3 className="font-bold font-heading text-gray-800 text-sm sm:text-base line-clamp-2 mb-1">
            {singleProduct?.productName} ({singleProduct?.quantity})
          </h3>
          {/* category  */}
          <span className="text-xs font-light text-gray-500 mb-2">
            {singleProduct?.category?.categoryName}
          </span>
          {/* rating  */}
          <div className="flex items-center mt-1">
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-1" />
            ) : isError ? (
              <span className="text-xs text-gray-500">No ratings yet</span>
            ) : (
              <div className="inline-flex items-center">
                <Rating
                  name="read-only"
                  value={data?.data?.averageRating}
                  size="small"
                  precision={0.1}
                  readOnly
                />
                <span className="text-xs text-gray-600 ml-1">
                  ({data?.data?.totalRating || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-auto">
        {/* product price  */}
        <span className="font-semibold text-green-600 text-lg">
          ₹{singleProduct?.price}
        </span>
        {/* add to cart button  */}
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddToCart(singleProduct?._id)}
          className="border border-green-400 px-4 py-2 text-green-400 bg-green-50 rounded-md flex items-center gap-1 text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
