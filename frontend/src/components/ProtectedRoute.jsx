import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ authenticatedComponent: AuthComponent, unauthenticatedComponent: UnauthComponent }) => {
  const [isValid, setIsValid] = useState(null); // null = loading, true = valid, false = invalid
  const token = localStorage.getItem('token') || localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      setIsValid(false); // No token, treat as invalid
      return;
    }

    // Validate token with backend using Axios
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/validate-token/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => setIsValid(true)) // Valid token
      .catch(() => {
        localStorage.removeItem('token');
        setIsValid(false); // Invalid token
      });
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Conditionally render based on validation
  return isValid ? <AuthComponent /> : <UnauthComponent />;
};

export default ProtectedRoute;
