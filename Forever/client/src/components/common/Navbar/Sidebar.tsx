import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react"; // Or any close icon you prefer
import { navLinks } from "../../../constants/Data";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const Sidebar = ({ isOpen, onClose, currentPath }: SidebarProps) => {
  // Handle link click - close sidebar and navigate
  const handleLinkClick = () => {
    onClose();
  };

  // Backdrop variants
  const backdropVariants:Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Sidebar variants
  const sidebarVariants:Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "tween" as const,
        duration: 0.3,
        ease: "easeOut", // use a valid easing string
      }, // easeOut
    },
    exit: {
      x: "100%",
      transition: {
        type: "tween" as const,
        duration: 0.2,
        ease: "easeIn", // use a valid easing string
      }, // easeIn
    },
  };

  // Link variants for staggered animation
  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, x: 20 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl lg:hidden"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6">
              <ul className="space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = currentPath === link.path;

                  return (
                    <motion.li
                      key={link.id}
                      custom={index}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={link.path}
                        onClick={handleLinkClick}
                        className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gray-100 text-black border-l-4 border-black"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Additional sidebar content can go here */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
              <div className="text-center text-gray-600">
                <p className="font-Montserrat font-bold text-lg text-[#4F4F4F]">
                  FOREVER
                </p>
                <p className="text-sm mt-2">Your fashion destination</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
