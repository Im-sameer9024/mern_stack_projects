import { HomeAuthImage } from '@/assets/images/images';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* ------------ Left Side (Form Section) ------------ */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">Welcome Back 👋</h1>
            <p className="text-gray-500 text-sm md:text-base font-content">
              Please enter your details to connect with us.
            </p>
          </div>

          {/* Form Outlet */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>

      {/* ------------ Right Side (Image Section) ------------ */}
      <div className="hidden md:flex md:flex-col flex-1 items-center justify-center bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Expense Tracker ₹</h2>
        <img
          src={HomeAuthImage}
          alt="auth visual"
          loading="lazy"
          className="max-w-md w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
