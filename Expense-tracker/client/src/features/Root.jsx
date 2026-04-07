import { useAuthStore } from '@/app/store/authStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Root = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token,"token is herein root")

  return <Navigate to={token ? '/dashboard' : '/login'} replace />;
};

export default Root;
