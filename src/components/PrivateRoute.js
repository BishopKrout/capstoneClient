// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


// const ProtectedRoute = ({
//     isAllowed,
//     redirectPath = '/landing',
//     children,
//   }) => {
//     if (!isAllowed) {
//       return <Navigate to={redirectPath} replace />;
//     }
  
//     return children ? children : <Outlet />;
//   };
