import { useAuthStore } from '@/app/store/authStore';
import React from 'react';
import { Navigate } from 'react-router-dom';
import CustomSpinner from '../custom/CustomSpinner';

const OpenRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const tokenLoading = useAuthStore((state) => state.tokenLoading);

  if (tokenLoading) {
    return <CustomSpinner />;
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default OpenRoute;
