import React, { useEffect, useState } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import ProfileHeader from '../components/profileHeader.js';

// Profile Page Component
function Profile() {
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header Component */}
      <Header isLoggedIn={true} />

      {/* Flex container for the main content */}
      <div
        className="container-fluid"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'stretch',
          marginTop: '75px',
          marginLeft: '50px',
          marginRight: '50px',
          marginBottom: '175px',
          border: '2px solid #40826D',
          borderRadius: '10px',
        }}
      >
        <div
          className="row"
          style={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          {/* Right Column */}
          <div
            className="col-md-12 d-flex flex-column align-items-start ms-3"
            style={{
              backgroundColor: '#E3E3E3',
              padding: '20px',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <div style={{ textAlign: 'left', width: '100%' }}>
              {/* User Info Section */}
              <ProfileHeader />
              <div
                style={{
                  width: '100%',
                  marginTop: '20px',
                  border: '2px solid #40826D',
                  borderRadius: '10px',
                  padding: '20px',
                  backgroundColor: '#FFF',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    display: 'flex', // Use flex layout
                    justifyContent: 'space-between', // Space between title and button
                    alignItems: 'center', // Align items vertically
                    marginTop: '20px',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                  }}
                >
                  {/* Title for the box that holds all information */}
                  <span>Personal Information</span>

                  {/* Change Password Button */}
                  <NavigationButton
                    text="Change Password"
                    path="/changepassword"
                    style={{
                      padding: '10px',
                      fontSize: '18px',
                      color: '#40826D',
                      backgroundColor: 'white',
                      border: '2px solid #40826D',
                      marginRight: '20px', 
                      width: '200px'
                    }}
                  />
                </div>
                <br />
                <Divider />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>First Name:</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>{user.first_name}</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>Last Name:</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>{user.last_name}</h3>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>Email:</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>{user.email}</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>Phone Number:</h3>
                    <h3 style={{ fontFamily: 'Arial', fontSize: '20px' }}>{user.phone_number}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
