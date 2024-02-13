import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('authToken') || null);
  console.log(currentUser, localStorage);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('authToken', user.token);
  };

  const logout = () => {
    // Implement logout functionality
    // For example, remove the user token from localStorage
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
