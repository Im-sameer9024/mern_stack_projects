/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FilterContent from "./FilterContent";

const FilterSidebar = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  getValues,
  handleCategoryChange,
  handleTypeChange,
  clearFilters,
}) => {
  return (
    <motion.div
      className="lg:w-1/4"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto lg:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-end items-center mb-6">
                {/* <h2 className="text-xl font-semibold">FILTERS</h2> */}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <FilterContent
                getValues={getValues}
                handleCategoryChange={handleCategoryChange}
                handleTypeChange={handleTypeChange}
                clearFilters={clearFilters}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent
          getValues={getValues}
          handleCategoryChange={handleCategoryChange}
          handleTypeChange={handleTypeChange}
          clearFilters={clearFilters}
        />
      </div>
    </motion.div>
  );
};

export default FilterSidebar;
