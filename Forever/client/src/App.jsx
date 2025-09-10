import React from "react";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <Navbar />

      <main className=" w-full  min-h-screen px-2 sm:px-4 md:px-8 lg:px-12 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />

          <Route path="/products/:productId" element={<SingleProductPage />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
};

export default App;
