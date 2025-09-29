/* eslint-disable no-unused-vars */
import React from "react";
import ProductCard from "../common/ProductCard";
import { useGetAllBestSellerProductsQuery } from "../../redux/apiSlices/productApiSlice";
import ProductsSkeleton from "../common/skeleton/ProductsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const BestSeller = () => {
  const { token } = useSelector((state) => state.auth);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllBestSellerProductsQuery();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isError) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8"
      >
        <Skeleton className="h-8 w-40" />
        <div className="text-red-500 p-4 bg-red-100 rounded-lg border border-red-200">
          Error loading best sellers:{" "}
          {error?.data?.message || error?.message || "Unknown error"}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8"
    >
      <motion.h2
        variants={titleVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
      >
        Best Seller
      </motion.h2>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {products?.products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <ProductCard singleProduct={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default BestSeller;
