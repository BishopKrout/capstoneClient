import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginPage from './LoginPage';
import { AuthProvider } from '../../../newclient/src/context/AuthContext';

jest.mock('axios');

describe('LoginPage', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        );
    });

    test('renders login form', () => {
        const loginFormElement = screen.getByTestId('login-form');
        expect(loginFormElement).toBeInTheDocument();
    });

    test('handles login successfully', async () => {
        const email = 'test@example.com';
        const password = 'password';

        axios.post.mockResolvedValueOnce({
            data: {
                token: 'test-token',
                username: 'test-user',
            },
        });

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(localStorage.getItem('authToken')).toBe('test-token');
            expect(screen.getByText('authToken: test-token')).toBeInTheDocument();
            expect(screen.queryByText('Login failed')).not.toBeInTheDocument();
        });
    });

    test('handles login failure', async () => {
        const email = 'test@example.com';
        const password = 'password';

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Invalid credentials',
                },
            },
        });

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(localStorage.getItem('authToken')).toBeNull();
            expect(screen.queryByText('authToken:')).not.toBeInTheDocument();
            expect(screen.getByText('Login failed')).toBeInTheDocument();
        });
    });
});