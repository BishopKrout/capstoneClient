// client/src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { CryptoProvider } from "./context/CryptoContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CryptoDetailPage from "./pages/CryptoDetailPage"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CryptoProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/crypto/:id" element={<CryptoDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
            <Footer />
          </div>
        </CryptoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
