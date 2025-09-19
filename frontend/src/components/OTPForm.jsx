import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits
  const [error, setError] = useState(null);
  const inputs = useRef([]); // Refs for auto-focus
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Get email from state

  useEffect(() => {
    console.log('Email from state:', email);
    if (!email) {
      // Redirect back if no email (edge case)
      navigate('/register');
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // One digit per box
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').trim();
    if (paste.length === 4 && !isNaN(paste)) {
      setOtp(paste.split(''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const fullOtp = otp.join('');

    if (fullOtp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp/`,
        { email, otp: fullOtp }
      );
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
        <p className="text-center mb-4">We've sent a 4-digit code to {email}</p>
        <form onSubmit={handleSubmit} onPaste={handlePaste}>
          <div className="flex justify-center space-x-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                maxLength={1}
                className="w-12 h-12 text-center text-2xl bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
