import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "../route";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/shared/utils/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const GlobalProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" closeButton duration={3000} />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};

export default GlobalProvider;
