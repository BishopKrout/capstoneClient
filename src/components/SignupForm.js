import React, { useState } from'react';

function  SignupForm({ onSignup }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.trim() !== confirmPassword.trim()) {
            setError('Passwords do not match.'); // Set error message
            return;
        }

        try {
            setError(''); // Clear any existing errors
            console.log('username:', username, 'email:', email, 'password:', password, 'confirmPassword', confirmPassword);
            await onSignup(username, email, password, confirmPassword); 
            // Handle success 
        } catch (err) {
            // Handle errors from the signup process
            const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
            setError(errorMessage);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                Confirm Password:
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type='submit'>Sign Up</button>
        </form>
    );

};

export default SignupForm;
