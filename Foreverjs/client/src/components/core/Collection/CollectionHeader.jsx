/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const CollectionHeader = ({ getValues, handlePriceChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      {/* Heading section */}
      <motion.div
        className="font-sans flex gap-2 items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="lg:text-[2.5rem] md:text-[2rem] sm:text-[1.8rem] text-[1.4rem]">
          ALL <span className="text-gray-400">COLLECTION</span>
        </h2>
        <motion.hr
          className="w-20 border-2 rounded-2xl border-black"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Price filter dropdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Select
          onValueChange={handlePriceChange}
          value={getValues("price")}
          className="bg-red-300"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent className="!max-w-[180px]" >
            <SelectGroup>
              <SelectLabel>Price Range</SelectLabel>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200-500">$200+</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
};

export default CollectionHeader;
