import React, { useEffect, useState } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import ProfileHeader from '../components/profileHeader.js';
function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/userinfo', {
      method: 'GET',
      credentials: 'include', // Important for including cookies
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return response.json();
    })
    .then(data => {
      setUser(data); // Update the state with the fetched user data
      console.log('User Info:', data);
    })
    .catch(error => {
      setError(error.message); // Set the error state if there's an issue
      console.error('Error:', error);
    });
  }, []);

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone_number}
      </p>
    </div>
  );
}

export default ProfilePage;
