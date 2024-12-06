import React, { useState, useEffect } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import ProfileHeader from '../components/profileHeader.js';

// Profile Page Component
function Profile() {
  const [showUser, setShowUser] = useState(false);
  const [showSavedPayments, setShowSavedPayments] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showTicketHistory, setShowTicketHistory] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile', {
          credentials: 'include', // Include session cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const data = await response.json();
        setUserData(data.user); // Assuming the API returns a `user` object
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Unable to load user information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isLoggedIn={true} />

      {/* My Profile header for the top of the page */}
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

      {/* Flex container for the main content */}
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
          {/* Left Column & All Info Held Within It */}
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
            {/* Button that toggles the basic user information */}
            <div style={{ textAlign: 'center' }}>
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

              {/* Button that toggles the saved payments */}
              <button
                onClick={toggleSavedPayments}
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
                Payment Info
              </button>

              {/* Button that toggles the security page */}
              <button
                onClick={toggleSecurity}
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
                Security
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div
            className="col-md-6 d-flex flex-column align-items-start ms-3"
            style={{
              backgroundColor: '#E3E3E3',
              padding: '20px',
              width: 'calc(100% - 20px)',
              flexGrow: 1,
            }}
          >
            <div style={{ textAlign: 'left', width: '100%' }}>
              {/* Overarching header w/ basic user information */}
              {showUser && <ProfileHeader />}

              {/* Shows all the user information */}
              {showUser && userData && (
                <div
                  style={{
                    height: '430px',
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
                      marginTop: '20px',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial',
                    }}
                  >
                    Personal Information
                  </div>

                  {/* Flex container for divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <Divider />
                  </div>

                  {/* Display user information */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px',
                    }}
                  >
                    {/* Left column */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'Arial' }}>First Name:</h3>
                      <h4 style={{ fontFamily: 'Arial' }}>{userData.firstName}</h4>
                      <h3 style={{ fontFamily: 'Arial' }}>Last Name:</h3>
                      <h4 style={{ fontFamily: 'Arial' }}>{userData.lastName}</h4>
                    </div>

                    {/* Right column */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'Arial' }}>Email:</h3>
                      <h4 style={{ fontFamily: 'Arial' }}>{userData.email}</h4>
                      <h3 style={{ fontFamily: 'Arial' }}>Phone Number:</h3>
                      <h4 style={{ fontFamily: 'Arial' }}>{userData.phoneNumber || 'N/A'}</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
