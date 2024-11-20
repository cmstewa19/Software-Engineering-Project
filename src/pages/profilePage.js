import React, { useState } from 'react';
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import Sidebar from '../components/sidebar.js'; // sidebar

// Profile Page Component
function Profile() {

  // State to manage the visibility of user info content
  const [showUser, setShowUser] = useState(false);

  // State to manage the visibility of saved payments content
  const [showSavedPayments, setShowSavedPayments] = useState(false);

  // Toggle the user info visibility
  const toggleUserInfo = () => {
    setShowUser(prevState => !prevState);
    setShowSavedPayments(false);
  };

  // Toggle the saved payments visibility
  const toggleSavedPayments = () => {
    setShowSavedPayments(prevState => !prevState);
    setShowUser(false); 
  };

  return (
    <div>
      {/* Header component */}
      <Header />

      {/* Sidebar component */}
      <Sidebar />

      {/* Flex container for the main row */}
      <div className="container-fluid">
        <div className="row" style={{ display: 'flex' }}>
          
          {/* Left Column - Center Aligned with Padding, Border, and Minimum Width */}
          <div 
            className="col-md-6 d-flex align-items-center me-3" 
            style={{
              padding: '20px',
              border: '2px solid #40826D',
              borderRadius: '10px',
              marginRight: '20px',
              flexDirection: 'column', 
              minWidth: '300px', 
            }}>

            {/* Content/text inside the bordered square */}
            <div style={{ textAlign: 'center' }}>
              <h2>My Profile</h2>

              {/* User Info Button in the Left Column, set width to 100% */}
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
                }}
              >
                User Info
              </button>

              {/* Saved Payments Button in the Left Column, set width to 100% */}
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
                }}
              >
                Payment Info
              </button>
            </div>
          </div>
          
          {/* Right Column - Left Aligned with Gray Background, Full Width */}
          <div 
            className="col-md-6 d-flex align-items-center ms-3" 
            style={{ 
              backgroundColor: '#E3E3E3', 
              padding: '20px',
              width: 'calc(100% - 20px)',
              flexDirection: 'column', 
            }}>

            {/* Content inside the gray square */}
            <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              {/* Conditionally render the content inside the gray column */}
              {showUser && (
                <div style={{ marginTop: '20px' }}>
                  <h3>User Info</h3>
                  <ul>
                    <li>Username</li>
                    <li>Password</li>
                    <li>Change Username</li>
                    <li>Change Password</li>
                    <li>Update Email</li>
                  </ul>
                </div>
              )}

              {showSavedPayments && (
                <div style={{ marginTop: '20px' }}>
                  <h3>Saved Payments</h3>
                  <ul>
                    <li>Credit Card - 1234 5678 9101 1121</li>
                    <li>PayPal</li>
                    <li>Bank Transfer</li>
                  </ul>
                  <h3>Add Payments:</h3>
                  <ul>
                    <li>Credit Card Number</li>
                    <li>Security Code</li>
                    <li>Expiration Date</li>
                  </ul>
                  <h3>Billing Information</h3>
                  <ul>
                    <li>Address</li>
                  </ul>
                </div>
              )}

              {/* Default Text when no button has been pressed */}
              {!showUser && !showSavedPayments && (
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
                  Press a button in the left column to view it in this box
                </h2>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
