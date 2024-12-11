import React, { useEffect, useState } from 'react';
import TempIcon from '../assets/profile-icon.jpg';

const UserProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/profile', {
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
        setUser(data);
        console.log('User Info:', data);
      })
      .catch(error => {
        setError(error.message);
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
    <div
      style={{
        width: '100%',
        marginTop: '20px',
        border: '2px solid #40826D',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#FFF',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping
        alignItems: 'center', // Align items in the center vertically
      }}
    >
      <div
        style={{
          flex: '0 0 200px', // Fix the size of the image
          display: 'flex',
          justifyContent: 'center', // Center image horizontally
        }}
      >
        {/* Left column */}
        <img
          src={TempIcon}
          alt="temporary icon to be changed later"
          style={{
            objectFit: 'cover',
            width: '200px',
            height: '200px',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          paddingLeft: '20px',
        }}
      >
        {/* Right column */}
        <h2
          style={{
            fontSize: '50px',
            wordWrap: 'break-word', 
            whiteSpace: 'normal', 
            lineHeight: '1.2',
            textAlign: 'center'
          }}
        >
          User Profile: {user.first_name} {user.last_name}
        </h2>
      </div>
    </div>
  );
};

export default UserProfileInfo;
