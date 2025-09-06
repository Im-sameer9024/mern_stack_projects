import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/core/Footer";
import ContactPage from "./pages/ContactPage";
import AllProductsPage from "./pages/AllProductsPage";
import CategoryPage from "./pages/CategoryPage";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterForm from "./components/common/RegisterForm";
import SendOtpPage from "./pages/SendOtpPage";
import ForgotPassword from "./components/common/ResetPassword";
import CheckEmail from "./components/common/CheckEmail";
import CartPage from "./pages/CartPage";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {!["/login", "/register", "/forgot-password","/send-otp","/check-email"].includes(
        location.pathname
      ) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/send-otp" element={<SendOtpPage/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/check-email" element={<CheckEmail/>} />
        <Route path="/cart" element={<CartPage/>} />
        

        <Route path="/" element={<HomePage />} />
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route
          path="/all-products/:productId"
          element={<SingleProductPage />}
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:categoryName/:categoryId" element={<CategoryPage />} />
      </Routes>
      {!["/login", "/register", "/forgot-password","/send-otp","/check-email"].includes(
        location.pathname
      ) && <Footer />}
    </>
  );
};

export default App;
