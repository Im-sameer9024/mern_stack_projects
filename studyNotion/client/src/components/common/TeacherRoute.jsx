import { Roles } from '@/data/constants';
import { useProfileDetails } from '@/features/Dashboard/Profile/hooks/useProfile';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../ui/spinner';

const TeacherRoute = ({ children }) => {
  const { data, isLoading } = useProfileDetails();

  // wait until profile loads
  if (isLoading) {
    return <Spinner />;
  }

  if (data?.data?.role !== Roles.TEACHER) {
    return <Navigate to={'/dashboard/my-profile'} replace />;
  }

  return children;
};

export default TeacherRoute;
