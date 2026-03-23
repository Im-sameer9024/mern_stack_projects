/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { NavbarLinks } from '@/data/navbar-links';

const MobileSidebar = ({ open, setOpen, token }) => {
  const [catalogOpen, setCatalogOpen] = useState(false);

  // Prevent scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-72 h-full bg-richBlack-900 text-white z-50 shadow-xl p-6 flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {NavbarLinks.map((link, i) => {
                if (link.path === '/catalog') {
                  return (
                    <div key={i}>
                      {/* Catalog Toggle */}
                      <button
                        onClick={() => setCatalogOpen((prev) => !prev)}
                        className="flex items-center justify-between w-full text-left hover:text-yellow-400"
                      >
                        {link.title}
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${catalogOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {catalogOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="ml-4 mt-2 flex flex-col gap-2 overflow-hidden text-sm"
                          >
                            <NavLink
                              to="/catalog/python"
                              onClick={() => setOpen(false)}
                              className="hover:text-yellow-400"
                            >
                              Python
                            </NavLink>

                            <NavLink
                              to="/catalog/java"
                              onClick={() => setOpen(false)}
                              className="hover:text-yellow-400"
                            >
                              Java
                            </NavLink>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={i}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-base ${
                        isActive ? 'text-yellow-400' : 'hover:text-yellow-400 transition'
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                );
              })}
            </div>

            {token ? (
              <div className="mt-8 flex flex-col gap-4 border-t border-richBlack-700 pt-6">
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-400"
                >
                  My Profile
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Cart
                </NavLink>

                <button className="text-left hover:text-yellow-400">Logout</button>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4 border-t border-richBlack-700 pt-6">
                <NavLink to="/login" onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={() => setOpen(false)}>
                  Signup
                </NavLink>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
