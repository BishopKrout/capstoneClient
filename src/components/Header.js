// src/components/Header.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="header">
    <div className="logo">CryptoTracker</div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!currentUser ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li className="username">{currentUser.username}</li>
              <li><button className="logout-button" onClick={logout}>Log Out</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
