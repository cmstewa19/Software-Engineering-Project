import React, { useState } from 'react';
// Home Page Component
function Home({ onNavigate }) {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={() => onNavigate('login')}>Go back to Login</button>
      </div>
    );
  }