/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import CollectionHeader from "../components/core/Collection/CollectionHeader";
import ProductsGrid from "../components/core/Collection/ProductGrid";
import { useSelector } from "react-redux";
import FilterSidebar from "../components/core/Collection/FilterSidebar";
import { useState } from "react";
import MobileFilterButton from "../components/core/Collection/MobileFilterButton";
import {motion} from 'framer-motion'


const CollectionPage = () => {
  //-------------- values by redux ---------------------
  const { products, loading } = useSelector((state) => state.products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { getValues, setValue, watch } = useForm({
    defaultValues: {
      category: [],
      price: "",
      type: [],
    },
  });

  const allFilters = watch()

  console.log("all filters is here",allFilters)

  //----------------------------price handler----------------------------

  const handlePriceChange = (price) => {
    setValue("price", price);
  };

  //---------------------------category change handler -----------------------------
  const handleCategoryChange = (category) => {
    const currentCategory = getValues("category") || [];

    const newCategory = currentCategory.includes(category)
      ? currentCategory.filter((c) => c !== category)
      : [...currentCategory, category];
    setValue("category", newCategory);
  };

  //----------------------------types change handler -----------------------------
  const handleTypeChange = (type) => {
    const currentType = getValues("type") || [];

    const newType = currentType.includes(type)
      ? currentType.filter((t) => t !== type)
      : [...currentType, type];
    setValue("type", newType);
  };

  //------------------------------clear filter handler------------------------------
  const clearFilters = () => {
    setValue("category", []);
    setValue("price", "");
    setValue("type", []);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-railway max-w-7xl mx-auto">
      <MobileFilterButton onClick={() => setMobileFiltersOpen(true)} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Filter Sidebar */}
        <FilterSidebar
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          getValues={getValues}
          handleCategoryChange={handleCategoryChange}
          handleTypeChange={handleTypeChange}
          clearFilters={clearFilters}
        />

        {/* Main Content */}
        <motion.div
          className="lg:w-3/4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CollectionHeader
            getValues={getValues}
            handlePriceChange={handlePriceChange}
          />

          <ProductsGrid products={products} loading={loading} />
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionPage;
