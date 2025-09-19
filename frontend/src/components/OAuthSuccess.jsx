// Example: OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');
    if (access) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);  // Optional
      navigate('/');  // Redirect to protected route
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}

export default OAuthSuccess;
