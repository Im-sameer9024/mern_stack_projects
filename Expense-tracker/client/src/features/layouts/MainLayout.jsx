import Navbar from '@/shared/components/common/Navbar';
import SideBar from '@/shared/components/common/SideBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/*-------------------- Navbar------------- */}
      <Navbar />

      {/*------------------ Layout ------------*/}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:block">
          <SideBar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
