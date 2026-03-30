import React from 'react';
import { Menu } from 'lucide-react';
import { SidebarLinks } from '@/shared/data/data';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';

const Navbar = () => {
  return (
    <div className="bg-white w-full px-4 h-14 border-b flex justify-between items-center shadow-sm">
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
                <NavLink key={item.id} to={item.link}>
                  {({ isActive }) => (
                    <SheetClose asChild>
                      <div
                        className={`
            flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
            transition duration-200
            ${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-slate-600 hover:bg-blue-500 hover:text-white'
            }
          `}
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    </SheetClose>
                  )}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg md:text-xl font-semibold text-slate-700">Expense Management</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=MS`}
          alt="user"
          className="w-9 h-9 rounded-full border"
        />
        <span className="hidden sm:block text-sm font-medium text-slate-600">Mohammad Sameer</span>
      </div>
    </div>
  );
};

export default Navbar;
