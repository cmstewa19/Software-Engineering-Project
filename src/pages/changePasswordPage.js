import React from 'react';
import trainPhoto from '../assets/train.jpg'; // photo for login page
import Header from '../components/header.js'; // header
import ChangePasswordForm from '../components/changePasswordForm.js';
import NavigationButton from '../components/navigationButton';



const ChangePassword = () => {

    return (
    <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header component */}
        <Header isLoggedIn={false} />
        
        {/* Flex container */}
        <div className="row no-gutters" style={{ flex: 1, display: 'flex', height: '100%' }}>
          
          {/* Left column for login form */}
          <div 
            style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '40px',
              padding: '20px',
            }}
          >
            <div 
              className="border p-4 rounded d-flex flex-column" 
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                boxSizing: 'border-box',
              }}
            >
              {/* Username and password form */}
              <ChangePasswordForm />
  
              {/* Sign-Up Option */}
              <div 
                style={{ 
                  fontSize: '16px', 
                  marginTop: '60px', 
                  textAlign: 'center',
                }}
              >

                <NavigationButton
                  text="Back"
                  path="/"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    marginTop: '10px',
                  }}
                />
              </div>
            </div>
          </div>
  
          {/* Right column for train photo */}
          <div 
            style={{
              flex: 1,
              height: '100%',
            }}
          >
            <img
              src={trainPhoto}
              alt="train photo"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
    </div>
    );
}

export default ChangePassword;