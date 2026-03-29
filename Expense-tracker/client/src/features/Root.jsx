import { useAuthStore } from '@/app/store/authStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Root = () => {
  const token = useAuthStore.getState().token;

  return <Navigate to={token ? '/dashboard' : '/login'} replace />;
};

export default Root;
