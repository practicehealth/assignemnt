import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle the logout action
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token
    // Redirect to login page or another route after logout
    navigate('/login');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
