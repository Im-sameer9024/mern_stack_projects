import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/common/Loader";

const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyCollection = lazy(() => import("./pages/Collection"));
const LazyAbout = lazy(() => import("./pages/About"));
const LazyContact = lazy(() => import("./pages/Contact"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/" element={<LazyHome />} />
            <Route path="/collection" element={<LazyCollection />} />
            <Route path="/about" element={<LazyAbout />} />
            <Route path="/contact" element={<LazyContact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default App;
