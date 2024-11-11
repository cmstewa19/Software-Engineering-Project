import React from 'react';
import trainPhoto from '../assets/train.jpg'; // photo for login page
import Header from '../components/header.js'; // header
import UsernamePasswordForm from '../components/usernamePasswordForm.js'; // username password form
import NavigationButton from '../components/navigationButton.js'; // nav button

function Login() {
  return (
    <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header component */}
      <Header />
      {/* Flex container for content */}
      <div className="row no-gutters" style={{ flex: 1, display: 'flex', height: '100%' }}>
          {/* Left column for login form */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <div 
                  className="border p-4 rounded text-center" 
                  style={{ 
                      width: '100%', 
                      maxWidth: '600px',
                      border: '2px solid #28a745',
                      boxSizing: 'border-box',
                  }}
              >
          {/* Welcome message */}
          <h2 style={{ fontFamily: 'Courier', fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>
              Welcome!
          </h2>
          {/* Username and password form */}
          <UsernamePasswordForm />
          {/* Login and Signup buttons */}
          <div style={{ marginTop: '20px' }}>
              <NavigationButton 
                  text="Log In"
                  path="/home"
                  style={{
                      display: 'block',
                      width: '100%',
                      marginBottom: '10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                  }}
              />
              <NavigationButton 
                  text="Sign Up"
                  path="/signup"
                  style={{
                      display: 'block',
                      width: '100%',
                      backgroundColor: '#ffffff',
                      color: '#28a745',
                      border: '2px solid #28a745',
                  }}
              />
              </div>
              </div>
          </div>
          {/* Right column for train photo */}
          <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
          }}>
              <img
                  src={trainPhoto}
                  alt="train photo"
                  className="img-fluid"
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
export default Login;