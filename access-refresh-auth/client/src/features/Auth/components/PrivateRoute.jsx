import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../authStore";

const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();

  return token ? children : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
