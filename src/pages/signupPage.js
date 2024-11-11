import React, { useState } from 'react'; 
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header

// Sign Up Page Component
function SignUp({onNavigate}) {
    return(
        <div>
        {/* Header component */}
        <Header />

        <h1>Sign Up Page</h1>
        
        {/* Navigate to Login */}
        <NavigationButton 
          text="Login" 
          path="/" 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />
      </div>
    );
  }

export default SignUp;