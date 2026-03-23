import React from "react";
import { Navigate } from "react-router-dom";

const Root = () => {
  const token = false;

  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
};

export default Root;
