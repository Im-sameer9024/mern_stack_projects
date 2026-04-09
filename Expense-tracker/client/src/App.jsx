import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CustomSpinner from "./shared/components/custom/CustomSpinner";
import AuthChecker from "./shared/utils/AuthChecker";
import { useAuthStore } from "@/app/store/authStore";

const App = () => {
  const tokenLoading = useAuthStore((state) => state.tokenLoading);

  return (
    <>
      <AuthChecker />

      {/* 🔥 BLOCK UI until auth ready */}
      {tokenLoading ? (
        <CustomSpinner />
      ) : (
        <Suspense fallback={<CustomSpinner />}>
          <Outlet />
        </Suspense>
      )}
    </>
  );
};

export default App;