import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Preloader from "./Components/Preloader/Preloader";
import ScrollToTop from "./Components/ScrollTotop/ScrollToTop";

// Lazy loading components
const Home = lazy(() => import("./Components/Home/Home"));
const ProductPage = lazy(() => import("./Components/Pages/ProductPage"));
const Featured = lazy(() => import("./Components/Pages/Featured"));
const Cart = lazy(() => import("./Components/Pages/Cart"));
const Previewpage = lazy(() => import("./Components/Pages/Previewpage"));
const Favorites = lazy(() => import("./Components/Pages/Favorites"));
const Form = lazy(() => import("./Components/Pages/Form"));
const Checkout = lazy(() => import("./Components/Pages/Checkout"));
const About = lazy(() => import("./Components/Pages/About"));
const ContactForm = lazy(() => import("./Components/Contact form/ContactForm"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateDataFetch = async () => {
      // Simulate API call or wait for resources
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 2000)), // Simulate a fetch delay
        import("./Components/Home/Home"), // Preload a critical component
      ]);

      setLoading(false); // Mark loading as complete
    };

    simulateDataFetch();
  }, []);

  return (
    <div className="web">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <Suspense fallback={<Preloader />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/:category/:product_name"
                element={<ProductPage />}
              />
              <Route path="/featured" element={<Featured />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/preview/:category/:product_id"
                element={<Previewpage />}
              />
              <Route path="/Favorites" element={<Favorites />} />
              <Route path="/login" element={<Form />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
            </Routes>
          </Suspense>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
