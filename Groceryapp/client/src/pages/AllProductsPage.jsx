/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useGetAllProductsQuery } from "../redux/apiSlices/productApiSlice";
import CategorySkeleton from "../components/common/skeleton/CategorySkeleton";
import ProductsSkeleton from "../components/common/skeleton/ProductsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/categorySlice";
import { setProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/common/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from '@/components/ui/skeleton';

const AllProductsPage = () => {
  //----------------------using redux toolkit & RTK query-------------------------
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const {
    data: allProducts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading || isFetching));
    if (allProducts) {
      dispatch(setProducts(allProducts?.allProducts || []));
    }
  }, [allProducts, dispatch, isLoading, isFetching]);

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

  const titleVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isError) {
    return (
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={errorVariants}
        className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8"
      >
        <Skeleton className="h-8 w-40" />
        <motion.div 
          variants={errorVariants}
          className="text-red-500 p-4 bg-red-100 rounded-lg border border-red-200"
        >
          Error loading products:{" "}
          {error?.data?.message || error?.message || "Unknown error"}
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-10 lg:px-18 md:px-16 sm:px-14 px-4 py-4 w-full font-content flex flex-col gap-8"
    >
      <motion.h2 
        variants={titleVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
      >
        All Products
      </motion.h2>
      
      {loading ? (
        <ProductsSkeleton />
      ) : (
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <ProductCard singleProduct={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 text-gray-500"
        >
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p>Check back later for new products!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllProductsPage;