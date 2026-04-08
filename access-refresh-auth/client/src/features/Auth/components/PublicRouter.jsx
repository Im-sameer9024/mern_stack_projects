import React from "react";
import { useAuthStore } from "../authStore";
import { Navigate } from "react-router-dom";

const PublicRouter = ({ children }) => {
   const { token } = useAuthStore();

  return token ? <Navigate to={"/"} replace /> : children;
};

export default PublicRouter;
