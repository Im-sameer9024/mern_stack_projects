/* eslint-disable no-unused-vars */
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupForm from "./components/core/Auth/SignupForm";
import VerifyEmail from "./components/core/Auth/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners";
import Dashboard from "./components/core/Dashboard";
import MyProfile from "./components/core/MyProfile";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import SettingPage from "./pages/SettingPage";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./pages/AddCourse";

const App = () => {
  const [loadingState, setLoadingState] = useState(false);
  const location = useLocation();

  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    setLoadingState(true);

    const timer = setTimeout(() => {
      setLoadingState(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="w-full h-full ">
      {/*--------------- Navbar Component---------- */}
      <Navbar />
      {loadingState ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[calc(100vh-80px)] flex justify-center items-center"
        >
          <FadeLoader color="#ffffff" />
        </motion.div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <LoginForm />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <SignupForm />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="/update-password/:token"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index path="/dashboard/my-profile" element={<MyProfile />} />
            <Route index path="/dashboard/settings" element={<SettingPage />} />

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
              </>
            )}
          </Route>

          <Route path="/*" element={<Error />} />
        </Routes>
      )}

      {/*--------------- Footer Component---------- */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
