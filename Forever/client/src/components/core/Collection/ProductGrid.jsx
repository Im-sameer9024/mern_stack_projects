/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProductCard from "../../common/ProductCard";

const ProductsGrid = ({ products, loading }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <>
      {/* Loading State */}
      {loading && (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={32} className="text-gray-400" />
          </motion.div>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={productVariants}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <motion.div 
          className="flex flex-col items-center justify-center h-64 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to see more results.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default ProductsGrid;