import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { route } from "./features/Router/route.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster
      toastOptions={{
        duration: 3000,
      }}
    />
    <RouterProvider router={route} />
  </>,
);
