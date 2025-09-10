/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const MobileFilterButton = ({ onClick }) => {
  return (
    <div className="lg:hidden mb-6">
      <motion.button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter size={20} />
        Filters
      </motion.button>
    </div>
  );
};

export default MobileFilterButton;