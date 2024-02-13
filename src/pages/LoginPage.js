// LoginPage.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { currentUser, login } = useAuth();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token, username } = response.data;
            localStorage.setItem('authToken', token);
            console.log('authToken:', token);
            login({ token, username });
            navigate('/'); 
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Login failed');
        }
    };
    
    return (
        <div>
            <h1>Login</h1>
            {loginError && <p className='error'>{loginError}</p>}
            <LoginForm onLogin={handleLogin} />
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
    );
}

export default LoginPage;
