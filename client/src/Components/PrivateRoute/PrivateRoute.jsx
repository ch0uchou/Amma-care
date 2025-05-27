import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const role = response.data.role;
        setUserRole(role);
        localStorage.setItem('userRole', role);
        setIsAuthorized(allowedRoles.includes(role));
      } catch (error) {
        console.error('Authorization check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAuthorized(false);
        setUserRole(null);
      }
    };

    checkAuthorization();
  }, [token, allowedRoles]);

  if (isAuthorized === null || userRole === null) {
    return <LoadingSpinner />;
  }

  if (!token) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" />;
  }

  if (!isAuthorized) {
    toast.error('You do not have permission to access this page');
    const redirectPath = {
      'user': '/',
      'doctor': '/doctor',
      'nurse': '/nurse',
      'pharmacy': '/pharmacy',
      'head of department': '/hod',
      'admin': '/admin'
    }[userRole] || '/';
    
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default PrivateRoute;
