import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate(); 
  const handleSignup = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      
      const response = await axios.post('/api/auth/signup', { username, email, password });
      if (response.status === 201) { 
        navigate('/login'); // Redirect to login page on successful signup
      } else {
        // Handle any non-successful HTTP status codes
        throw new Error('Signup failed. Please try again.');
      }
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      setSignupError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {signupError && <p className="error">{signupError}</p>}
      <SignupForm onSignup={handleSignup} />
    </div>
  );
}

export default SignupPage;
