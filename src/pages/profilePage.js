import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header

// Home Page Component
function Profile() {
  return (
    <div>
        {/* Header component */}
        <Header />

        <h1>My Profile</h1>
    </div>
  );
}

export default Profile;
