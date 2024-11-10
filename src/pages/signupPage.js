import React, { useState } from 'react';
// Sign Up Page Component
function SignUp({onNavigate}) {
    return(
      <div>
        <h1>Sign Up Page</h1>
        <button onClick={() => onNavigate('login')}>Go back to Login</button>
      </div>
    );
  }