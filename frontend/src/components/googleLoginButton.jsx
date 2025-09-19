import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccessPath = '/dashboard' }) => {
  const handleSuccess = (response) => {
    // Redirect to Django's initiation URL
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/social/login/google-oauth2/`;
    // Django will handle redirect to Google, state generation, and callback
  };

  const handleError = () => {
    console.error('Google Login Failed');
    alert('Google login failed. Please try again.');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      text="continue_with"
      shape="rectangular"
      theme="outline"
    />
  );
};

export default GoogleLoginButton;
