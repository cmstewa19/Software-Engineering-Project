import React from 'react';
import Header from '../components/header.js';
import Divider from '../components/divider.js';
import NavigationButton from '../components/navigationButton.js';

{/* Page to change a user's password */}
function ChangePasswordPage() {
    return (
        <div>
            {/* Header component */}
            <Header isLoggedIn={true} />

            {/* Text Header */}
            <h1 style = {{
                fontSize: '50px',
                textAlign: 'center',
                marginTop: '50px'
            }}>Change Your Password</h1>

            {/* Box */}
            <div style={{ 
              width: '95%',
              maxWidth: '100%',
              margin: '0 auto',
              padding: '40px', 
              boxSizing: 'border-box',
              textAlign: 'left', 
              border: '2px solid #40826D',
              borderRadius: '10px',
              position: 'relative',
              top: '20px',
              height: '60vh'
            }}
          >
            {/* Display current password */}
            <div style = {{
                fontFamily: 'Arial',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>Your Current Password:</div>
            
            <div style = {{marginBottom: '20px'}}>(Insert Password Here)</div>

            {/* Divider Component */}
            <div style = {{
                display: 'flex',
                justifyContent: 'right',
                width: '100%',
                marginBottom: '20px'
            }}><Divider /></div>

            {/* Create a new password */}
            <div style = {{
                fontFamily: 'Arial',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '20px',
                marginBottom: '20px'
            }}>Your New Password:</div>

            <input
              type="New Password"
              placeholder="New Password"
              style={{
                width: '98%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            />

            {/* Confirm new password */}
            <div style = {{
                fontFamily: 'Arial',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>Confirm Password:</div>

            <input
              type="password"
              placeholder="Confirm Password"
              style={{
                width: '98%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            />

            {/* Button to change the account password, check with account */}

            <NavigationButton
                text="Change Password"
                path="/profile"
                style={{
                padding: '10px',
                fontSize: '18px',
                margin: '20px auto',
                color: 'white',
                backgroundColor: '#40826D',
                border: '1px solid #40826D',
                display: 'block',
                marginBottom: '40px'
            }}/>

            {/* Return to Home */}

            <div style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <div style = {{
                    fontFamily: 'Arial',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginRight: '40px',
                }}>Don't want to change your password?</div>
        
                <NavigationButton
                    text="Return to Profile"
                    path="/profile"
                    style={{
                    padding: '10px',
                    fontSize: '15px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid #40826D',
                    width: '250px'
                }}/>
            </div>
          </div>
        </div>
    );
}

export default ChangePasswordPage;
