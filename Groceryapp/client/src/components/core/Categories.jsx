/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useGetAllCategoriesQuery } from "../../redux/apiSlices/categoryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setLoading } from "../../redux/slices/categorySlice";
import CategorySkeleton from "../common/skeleton/CategorySkeleton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  //--------------------------- using redux toolkit functionality---------------------------------
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading || isFetching));
    if (categoriesData) {
      dispatch(setCategories(categoriesData?.categories || []));
    }
  }, [categoriesData, dispatch, isLoading, isFetching]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (isError) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Categories</h2>
        <div className="text-red-500 p-4 bg-red-100 rounded-lg border border-red-200">
          Error loading categories:{" "}
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
        variants={itemVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
      >
        Categories
      </motion.h2>
      
      {loading ? (
        <CategorySkeleton />
      ) : (
        <motion.div 
          variants={containerVariants}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <motion.div
                key={category._id}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                className="flex-shrink-0"
              >
                <Link
                  to={`/${category.categoryName.toLowerCase()}/${category._id}`}
                  className="block"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className="flex flex-col p-3 md:p-4 rounded-xl group justify-center items-center text-center min-w-[120px] md:min-w-[140px] even:bg-[#fee3e3] odd:bg-[#e6ebf9] shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mb-2 md:mb-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden rounded-full bg-white p-2">
                      <img
                        src={category?.image}
                        alt={category?.categoryName}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-95 transition-all duration-300 ease-in-out"
                      />
                    </div>
                    <span className="font-semibold font-heading text-sm md:text-base text-gray-800 line-clamp-2">
                      {category?.categoryName}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={itemVariants}
              className="text-gray-500 py-8 text-center w-full"
            >
              No categories found
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
};

export default Categories;