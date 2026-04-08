import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useAuthInit from "./features/Auth/components/useAuthInit";
import toast from "react-hot-toast";

const App = () => {
  const loading = useAuthInit();

  if (loading) {
    return toast.loading("Authenticating user...");
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
