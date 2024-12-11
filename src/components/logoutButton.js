import React from 'react';
import NavigationButton from '../components/navigationButton.js';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include', // Include session cookies
      });

      if (response.ok) {
        console.log('Logged out successfully.');
        window.location.href = 'http://localhost:3001/';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.error);
        alert('Logout failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  };

  return (
    <NavigationButton
      text="Logout"
      path="/"
      style={{ backgroundColor: 'red', color: 'white' }}
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
