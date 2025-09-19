import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {  // Professional confirmation
      // Check and remove tokens
      if (localStorage.getItem('access_token')) localStorage.removeItem('access_token');
      if (localStorage.getItem('refresh_token')) localStorage.removeItem('refresh_token');
      if (localStorage.getItem('token')) localStorage.removeItem('token');

      // Animate fade-out then redirect
      const button = document.querySelector('#logout-button');
      if (button) {
        button.classList.add('animate-fadeOut');
        setTimeout(() => navigate('/login'), 300);  // Redirect after animation
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <button
      id="logout-button"
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
