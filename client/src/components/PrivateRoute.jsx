import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getUserRole } from '../api/auth/authAPI';

const PrivateRoute = ({ allowedRoles, redirectPath }) => {
  const userRole = getUserRole();
  if(!allowedRoles.includes(userRole)){
    return <Navigate to="/" replace />;
  }
  return <Outlet/>;
};

export default PrivateRoute;