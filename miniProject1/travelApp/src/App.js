import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import BookingForm from "./pages/BookingForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <BookingProvider>
      <ErrorBoundary>
        <Router>
          <Header />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand fw-bold" to="/">Home</Link>
              <div className="ms-auto">
                <Link className="btn btn-outline-primary me-2" to="/packages">
                  Packages
                </Link>
                <Link className="btn btn-outline-success me-2" to="/booking">
                  Book Now
                </Link>
                <Link className="btn btn-outline-secondary" to="/contact">
                  Contact
                </Link>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </Router>
      </ErrorBoundary>
    </BookingProvider>
  );
}

export default App;
