import { sidebarLinks } from '@/data/dashboard-links';
import { NavLink } from 'react-router-dom';
import * as Icons from 'react-icons/vsc';
import { useLogoutUser } from '@/features/Auth/hooks/useAuth';
import Modal from '../custom/Modal';
import { useState } from 'react';
import { Button } from '../ui/button';
import { RxCross2 } from 'react-icons/rx';
import { LogOut } from 'lucide-react';
import { useProfileDetails } from '@/features/Dashboard/Profile/hooks/useProfile';
import { Badge } from '../ui/badge';

const DashboardSidebar = () => {
  const { data, isLoading, isError, error } = useProfileDetails();
  const { mutateAsync: LogoutUser, isPending: logoutLoading } = useLogoutUser();

  const [openLogout, setOpenLogout] = useState(false);

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const role = data?.data?.role;

  return (
    <div className=" fixed top-16 left-0 h-[calc(100vh-64px)] overflow-y-auto w-17.5 md:w-55 min-h-screen bg-richBlack-800 border-r border-richBlack-700 flex flex-col justify-between ">
      {/* Top Links */}
      <div className="py-6">
        {isLoading ? (
          <div className="text-white p-4 text-center">Loading...</div>
        ) : (
          <>
          <Badge className=" capitalize mb-2 bg-yellow-900 text-yellow-400">
            {role}
          </Badge>
            {sidebarLinks.map((link) => {
              if (link.type && link.type !== role) return null;

              const Icon = Icons[link.icon];

              return (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center text-xs gap-3 px-6 py-3 transition-all
        ${
          isActive
            ? 'bg-yellow-900 text-yellow-400 border-l-4 border-yellow-400'
            : 'text-richBlack-200 hover:bg-richBlack-700'
        }`
                  }
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="hidden md:block whitespace-nowrap">{link.name}</span>
                </NavLink>
              );
            })}
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-richBlack-700 pb-20">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-xs transition-all
            ${
              isActive
                ? 'bg-yellow-900 text-yellow-400 border-l-4 border-yellow-400'
                : ' hover:bg-richBlack-700'
            }`
          }
        >
          <Icons.VscSettingsGear size={14} className="shrink-0" />
          Settings
        </NavLink>

        <button
          onClick={() => setOpenLogout(true)}
          className="flex items-center text-nowrap gap-3 px-6 py-3 text-xs  hover:bg-richBlack-700 w-full hover:cursor-pointer"
        >
          <Icons.VscSignOut size={14} className="shrink-0" />
          Log Out
        </button>

        <Modal
          isVisible={openLogout}
          width={'lg:w-[25%]'}
          content={
            <div className="space-y-5">
              {/* Header */}
              <div className="flex justify-end items-center">
                <Button onClick={() => setOpenLogout(false)} disabled={logoutLoading}>
                  <RxCross2 size={18} />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-center">Are you want to Logout ?</h3>
                <div className=" flex  justify-center gap-4 mt-4">
                  <Button
                    onClick={LogoutUser}
                    className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    <LogOut size={16} />
                    {logoutLoading ? 'Loading....' : 'Logout'}
                  </Button>
                  <Button
                    onClick={() => setOpenLogout(false)}
                    className="flex items-center gap-2 text-black bg-slate-300 hover:bg-slate-400"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
