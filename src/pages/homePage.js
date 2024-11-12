import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header

// Home Page Component
function Home() {
  return (
    <div>
        {/* Header component */}
        <Header />

        <h1>Home Page</h1>
      
        {/* Navigate to Browse Trains */}
        <NavigationButton 
          text="Browse Trains" 
          path="/browse" 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />

        {/* Navigate to Profile Page */}
        <NavigationButton 
          text="Profile Page" 
          path="/profile" 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />
    </div>
  );
}

export default Home;
