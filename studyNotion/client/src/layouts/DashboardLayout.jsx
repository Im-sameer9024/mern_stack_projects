import DashboardSidebar from '@/components/common/DashboardSidebar';
import Navbar from '@/components/common/Navbar';
import ScrollToTop from '@/components/common/ScrollToTop';
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="flex min-h-screen bg-richBlack-900 text-white pt-16">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
        <div className="ml-17.5 md:ml-55 px-4 sm:px-6 lg:px-10 py-6 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
