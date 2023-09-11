import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './signup'; // Corrected typo
import Logout from './Logout';
import Homepage from './Homepage';
import EventDetails from './EventDetails';
import CardDetails from './CardDetails';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

// Check if the user is authenticated (has a valid JWT)
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// ProtectedRoute component to handle protected routes
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated() ? (
    <>{element}</>
  ) : (
    // If not authenticated, navigate to the login page
    <Navigate to="/login" replace />
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
      <Route path="/card-details" element={<ProtectedRoute element={<CardDetails />} />} />
      <Route path="/event-details" element={<ProtectedRoute element={<EventDetails />} />} />
    </Routes>
  );
};

export default AppRoutes;
