import React, { useState, useEffect } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import ProfileHeader from '../components/profileHeader.js';

function Profile() {
  const [userData, setUserData] = useState(null); // Holds user profile data
  const [error, setError] = useState(null); // Holds any errors
  const [showUser, setShowUser] = useState(false);
  const [showSavedPayments, setShowSavedPayments] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showTicketHistory, setShowTicketHistory] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile`, {
          credentials: 'include', // Ensures cookies (session) are sent with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to load profile data. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  const toggleUserInfo = () => {
    setShowUser((prevState) => !prevState);
    setShowSavedPayments(false);
    setShowSecurity(false);
    setShowTicketHistory(false);
  };

  const toggleSavedPayments = () => {
    setShowSavedPayments((prevState) => !prevState);
    setShowUser(false);
    setShowSecurity(false);
    setShowTicketHistory(false);
  };

  const toggleSecurity = () => {
    setShowSecurity((prevState) => !prevState);
    setShowUser(false);
    setShowSavedPayments(false);
    setShowTicketHistory(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isLoggedIn={true} />

      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: '65px',
          marginTop: '20px',
          fontSize: '50px',
          fontWeight: 'bold',
        }}
      >
        My Profile
      </div>

      <div
        className="container-fluid"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'stretch',
          marginTop: '100px',
        }}
      >
        <div
          className="row"
          style={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <div
            className="col-md-6 d-flex flex-column align-items-center me-3"
            style={{
              padding: '20px',
              border: '2px solid #40826D',
              borderRadius: '10px',
              marginRight: '20px',
              minWidth: '300px',
            }}
          >
            <button
              onClick={toggleUserInfo}
              style={{
                backgroundColor: '#40826D',
                color: 'white',
                border: '1px solid #40826D',
                padding: '10px 0',
                marginTop: '20px',
                borderRadius: '5px',
                width: '100%',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              User Info
            </button>
          </div>

          <div
            className="col-md-6 d-flex flex-column align-items-start ms-3"
            style={{
              backgroundColor: '#E3E3E3',
              padding: '20px',
              width: 'calc(100% - 20px)',
              flexGrow: 1,
            }}
          >
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {showUser && userData && (
              <div>
                <h3>First Name: {userData.first_name}</h3>
                <h3>Last Name: {userData.last_name}</h3>
                <h3>Email: {userData.email}</h3>
                <h3>Phone Number: {userData.phone_number}</h3>
                <h3>Billing Address: {userData.billing_address}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
