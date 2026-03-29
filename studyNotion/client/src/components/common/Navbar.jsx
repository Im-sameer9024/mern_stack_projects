/* eslint-disable no-unused-vars */
import Logo from '@/assets/Logo/Logo-Full-Light.png';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Loader, Loader2, Menu, Search, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import MobileSidebar from './MobileSidebar';
import { Button } from '../ui/button';
import NavbarSearch from './NavbarSearch';
import { useLogoutUser } from '@/features/Auth/hooks/useAuth';
import { NavbarLinks } from '@/data/navbar-links';
import { Spinner } from '../ui/spinner';
import { useProfileDetails } from '@/features/Dashboard/Profile/hooks/useProfile';
import { useGetAllCategory } from '@/features/Category/hooks/useCategory';

const Navbar = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showShadow, setShowShadow] = useState('');

  const [searchOpen, setSearchOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { data, isPending } = useProfileDetails();
  const { data: categories, isPending: categoriesPending } = useGetAllCategory();

  const categoryData = categories?.data?.category;

  useEffect(() => {
    const show = () => {
      if (window.scrollY >= 10) {
        setShowShadow('shadow-lg shadow-richBlack-700');
      } else {
        setShowShadow('');
      }
    };

    window.addEventListener('scroll', show);

    return () => {
      window.removeEventListener('scroll', show);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;

      if (!target.closest('.navbar-dropdown')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-16 border-b border-richBlack-700 bg-richBlack-800 text-white z-50 ${showShadow}`}
      >
        <div className="w-11/12 max-w-6xl mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="logo" className="w-32" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NavbarLinks.map((link, i) => {
              if (link.path === '/catalog') {
                return (
                  <div
                    key={i}
                    className="relative"
                    onMouseEnter={() => setShowCatalog(true)}
                    onMouseLeave={() => setShowCatalog(false)}
                  >
                    <span className="cursor-pointer hover:text-yellow-400 transition">
                      {link.title}
                    </span>

                    <AnimatePresence>
                      {showCatalog && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-8 left-0 bg-white text-black py-2 px-8 rounded-lg shadow-lg flex flex-col gap-2 z-50"
                        >
                          <div className="absolute w-6 h-6 bg-white -top-1  rotate-45 z-40 left-3"></div>
                          <div className=" font-semibold  flex flex-col gap-2 z-50">
                            {categoryData.map((cat) => (
                              <Link
                                to={`/category/${cat._id}`}
                                key={cat._id}
                                className="text-nowrap hover:text-yellow-500"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
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
                  className={({ isActive }) =>
                    isActive ? 'text-yellow-400' : 'hover:text-yellow-400 transition'
                  }
                >
                  {link.title}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          {token ? (
            <div className="hidden md:flex items-center gap-6 relative">
              {/* 🔎 Search */}
              <div className="relative navbar-dropdown ">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchOpen((prev) => !prev);
                  }}
                >
                  <Search className="hover:text-yellow-400 transition hover:cursor-pointer" />
                </button>

                <NavbarSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
              </div>

              {/* 🛒 Cart */}
              <Link
                to={'/cart'}
                className="relative hover:text-yellow-400 transition hover:cursor-pointer"
              >
                <ShoppingBag />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">
                  2
                </span>
              </Link>

              {/* 👤 Profile */}
              <div className="relative">
                <Link
                  to="/dashboard/my-profile"
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-richBlue-600 hover:cursor-pointer  transition flex justify-center items-center"
                >
                  {isPending ? (
                    <Spinner className="size-5" />
                  ) : (
                    <img src={data.data?.avatar} alt="profile" />
                  )}
                </Link>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button asChild className="border-2 border-richBlack-700">
                <Link to="/login">Log In</Link>
              </Button>

              <Button asChild className="border-2 border-richBlack-700">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} token={token} />
    </>
  );
};

export default Navbar;
