import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CollectionPage from "./pages/CollectionPage";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import SignupPage from "./pages/SignupPage";
import OtpPage from "./pages/OtpPage";

const App = () => {
  const location = useLocation();

  return (
    <>
      {!["/login","/signup","/send-otp"].includes(location.pathname) && <Navbar />}

      <main className=" w-full  min-h-screen px-2 sm:px-4 md:px-8 lg:px-12 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/send-otp" element={<OtpPage />} />


          <Route path="/orders" element={<OrdersPage />} />

          <Route path="/products/:productId" element={<SingleProductPage />} />
        </Routes>
      </main>
      {!["/login","/signup","/send-otp"].includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
