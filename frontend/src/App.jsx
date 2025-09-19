import React from 'react';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import OTPForm from './components/otpForm';
import Products from './components/Products';
import OAuthSuccess from './components/OAuthSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <CartProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              authenticatedComponent={Products}
              unauthenticatedComponent={Landing}
            />
          } />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/home" element={<Products />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
