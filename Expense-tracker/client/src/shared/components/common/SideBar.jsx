import { SidebarLinks } from '@/shared/data/data';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { IoIosSwap } from 'react-icons/io';
import clsx from 'clsx';
import Modal from '../custom/Modal';
import CustomButton from '../custom/CustomButton';
import { useLogoutUser } from '@/features/Auth/hooks/useAuth';
import { LogOut } from 'lucide-react';

const SideBar = () => {
  const path = useLocation().pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { mutateAsync: LogoutUser, isPending: LogoutLoading } = useLogoutUser();

  const onOpen = () => {
    setShowLogoutModal(true);
  };

  const onClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-r border-slate-200 h-screen p-3 relative flex flex-col items-center"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-3 bg-white hover:cursor-pointer text-slate-600 border rounded-full p-0.5 shadow hover:bg-slate-100 transition"
        >
          <IoIosSwap />
        </button>

        {/* Links */}
        <div className="flex flex-col gap-3 mt-6 w-full items-center">
          {SidebarLinks.map((item) => {
            if (item.text === 'Logout') {
              return (
                <button
                  key={item.id}
                  onClick={onOpen}
                  className={clsx(
                    'flex items-center gap-3 transition-all duration-200 group hover:cursor-pointer',
                    isCollapsed
                      ? 'justify-center w-12 h-12 rounded-full'
                      : 'w-full px-3 py-2 rounded-lg',
                    'text-blue-500 hover:bg-blue-500 hover:text-white'
                  )}
                >
                  {/* Icon */}
                  <span className="text-lg flex items-center justify-center">
                  <LogOut/>
                  </span>

                  {/* Text */}
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">Logout</span>
                  )}
                </button>
              );
            } else {
              return (
                <NavLink
                  key={item.id}
                  to={item.link}
                  title={isCollapsed ? item.text : ''}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 transition-all duration-200 group',
                      isCollapsed
                        ? 'justify-center w-12 h-12 rounded-full'
                        : 'w-full px-3 py-2 rounded-lg',
                      'hover:bg-blue-500 hover:text-white',
                      {
                        'bg-blue-500 text-white shadow-sm': isActive,
                        'text-slate-600': !isActive,
                      }
                    )
                  }
                >
                  {/* Icon */}
                  <motion.span
                    animate={{
                      scale: path.startsWith(item.link) ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-lg flex items-center justify-center"
                  >
                    {item.icon}
                  </motion.span>

                  {/* Text */}
                  {!isCollapsed && (
                    <motion.span
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item?.text}
                    </motion.span>
                  )}
                </NavLink>
              );
            }
          })}
        </div>
      </motion.div>
      <Modal
        isVisible={showLogoutModal}
        onClose={onClose}
        content={
          <div>
            <p>Are You want to Logout ?</p>
            <div className=" mt-4 gap-4 flex ">
              <CustomButton onClick={() => LogoutUser()} loading={LogoutLoading} active={true}>
                Logout
              </CustomButton>
              <CustomButton active={false} onClick={onClose}>
                Cancel
              </CustomButton>
            </div>
          </div>
        }
        width={'30%'}
      />
    </>
  );
};

export default SideBar;
