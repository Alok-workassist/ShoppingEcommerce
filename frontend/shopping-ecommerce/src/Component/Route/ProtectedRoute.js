import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const ProtectedRoute = ({ element, isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return (
      <Fragment>
        <Loader />
      </Fragment>
    );
  }

  // Check if the user is authenticated and if they are an admin if isAdmin is true
  if (isAuthenticated) {
    if (isAdmin == true && user?.role !== 'admin') {
      return <Navigate to="/login" />; // Redirect if user is not an admin
    } 
    return element; // Render the component if authenticated
  }

  return <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
