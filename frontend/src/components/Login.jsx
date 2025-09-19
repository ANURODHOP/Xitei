import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleLoginButton from './googleLoginButton'; // Import as before

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login/`,
        { emailOrUsername, password }
      );
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-500 opacity-20 animate-pulse"></div>
      
      <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-indigo-500/50 transform transition-all duration-300 hover:scale-105">
        {error && (
          <p className="text-red-300 mb-4 text-center animate-fadeIn">{error}</p>
        )}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-300 tracking-wide">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Email or Username"
            className="w-full p-3 mb-4 bg-gray-700 border border-indigo-500/50 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-700 border border-indigo-500/50 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-indigo-200">
          New here? <Link to="/register" className="text-indigo-400 hover:underline hover:text-indigo-300 transition duration-200">Register</Link>
        </p>
        <div className="mt-6">
          <GoogleLoginButton onSuccessPath="/dashboard" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
