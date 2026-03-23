import Navbar from '@/components/common/Navbar';
import ScrollToTop from '@/components/common/ScrollToTop';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className=" min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
