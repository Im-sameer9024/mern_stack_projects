/* eslint-disable react-refresh/only-export-components */
import App from "@/App";
import LoginPage from "@/features/Auth/pages/LoginPage";
import SignupPage from "@/features/Auth/pages/SignupPage";
import AuthLayout from "@/features/layouts/AuthLayout";
import MainLayout from "@/features/layouts/MainLayout";
import Root from "@/features/Root";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("@/features/Dashboard/index"));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // ---------------- Auth Layout ----------------------
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
        ],
      },

      //--------------------- Main Layout ---------------------
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/",
        element: <Root />,
      },
    ],
  },
]);
