import { Search, X } from "lucide-react";
import { Button } from "../../ui/button";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Input } from "../../ui/input";
import { useEffect } from "react";

interface SearchBarProps {
  isVisible: boolean;
  onClose: () => void;
  onToggleSearchBar: () => void;
}

const SearchBar = ({
  isVisible,
  onClose,
  onToggleSearchBar,
}: SearchBarProps) => {
  
  // Close on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVisible, onClose]);

  const SearchVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="hidden md:block ">
      <Button
        onClick={onToggleSearchBar}
        variant="ghost"
        className="rounded-full hover:cursor-pointer group"
      >
        <Search className="group-hover:scale-105 transition-all duration-300 ease-in-out" />
      </Button>

      {/*---------------- search bar ----------------- */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed  top-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg  flex items-center px-4 py-2 z-50 border"
            initial="closed"
            animate="open"
            exit="closed"
            variants={SearchVariants}
          >
            <div className="w-1/2 mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  className="w-full pl-4 pr-12 py-2 rounded-full border"
                  placeholder="Search products..."
                />
                <Search
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
