// Form for login page
// Will need to take input in the future

import React from 'react';
import NavigationButton from '../components/navigationButton';

function UsernamePasswordForm() {
  return (
    <div 
      className="bg-light border border-light rounded d-flex flex-column align-items-center"
      style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '40px', 
        boxSizing: 'border-box',
        textAlign: 'center',
        border: '2px solid #40826D',
        borderRadius: '10px',
      }}
    >
      {/* Welcome Message */}
      <h2 style={{ fontFamily: 'Courier', fontSize: '2rem', marginBottom: '20px' }}>
        Welcome!
      </h2>

      {/* Username Input with placeholder */}
      <input
        type="text"
        placeholder="Email"
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      />

      {/* Password Input with placeholder */}
      <input
        type="password"
        placeholder="Password"
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      />

      {/* Login Button */}
      <NavigationButton
        text="Login"
        path="/home" 
        style={{
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          marginBottom: '20px',
          padding: '10px',
        }}
      />
    </div>
  );
}

export default UsernamePasswordForm;
