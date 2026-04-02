import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { SidebarLinks } from '@/shared/data/data';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import clsx from 'clsx';
import { useGetUserDetails } from '@/features/Auth/hooks/useAuth';
import { Spinner } from '../ui/spinner';

const Navbar = () => {
  const { data: UserDetails, isLoading: UserDetailsLoading } = useGetUserDetails();

  const user = UserDetails?.data;
  return (
    <div className="bg-white w-full px-4 h-14 border-b border-slate-200 flex justify-between items-center shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* ---------------- Drawer for mobile screen -------------- */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="sm:hidden p-2 rounded-md hover:bg-gray-100">
              <Menu className="text-slate-700" />
            </button>
          </SheetTrigger>

          {/* 🔥 Drawer Content */}
          <SheetContent side="left" className="w-40 p-4">
            <h2 className="text-lg font-semibold mb-4">💰 Expense Tracker</h2>

            <div className="flex flex-col gap-2">
              {SidebarLinks.map((item) => (
                <>
                  {item.text === 'Logout' ? (
                    <button
                      key={item.id}
                      className={clsx(
                        'flex items-center gap-3 transition-all duration-200 group hover:cursor-pointer',

                        ' w-12 h-12 rounded-full',
                        'w-full px-3 py-2 rounded-lg',
                        'text-red-500 hover:bg-red-500 hover:text-white'
                      )}
                    >
                      {/* Icon */}
                      <span className="text-lg flex items-center justify-center">
                        <LogOut />
                      </span>

                      <span className="text-sm font-medium whitespace-nowrap">Logout</span>
                    </button>
                  ) : (
                    <NavLink key={item.id} to={item.link}>
                      {({ isActive }) => (
                        <SheetClose asChild>
                          <div
                            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition duration-200 ${isActive ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-blue-500 hover:text-white'}`}
                          >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                          </div>
                        </SheetClose>
                      )}
                    </NavLink>
                  )}
                </>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg md:text-xl font-semibold text-slate-700">Expense Management</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {UserDetailsLoading ? (
          <div className=" flex items-center gap-1">
            <Spinner />
            <span className="text-sm font-medium text-slate-600">Loading...</span>
          </div>
        ) : (
          <div className=" flex gap-2">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
              alt="user"
              className="w-9 h-9 rounded-full "
            />
            <div className=" -space-y-1">
              <span className="hidden sm:block text-md font-medium text-slate-600">
                {user?.name}
              </span>
              <span className="hidden sm:block text-xs font-light text-slate-600">
                {user?.email}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
