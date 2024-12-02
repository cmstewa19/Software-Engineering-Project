import React from 'react';
import TempIcon from '../assets/TempIcon2.jpg'; 

const UserProfileInfo = () => {
  return (
    <div
      style={{
        height: '250px',
        width: '100%',
        marginTop: '20px',
        border: '2px solid #40826D',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#FFF',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Left column */}
        <img
          src={TempIcon}
          alt="temporary icon to be changed later"
          style={{
            objectFit: 'cover',
            width: '220px',
            height: '220px',
          }}
        />

        {/* Right column */}
        <div style={{ flex: 1 }}>
          <br />
          <br />
          <h3 style={{ fontFamily: 'Arial' }}>(First Name)</h3>
          <h3 style={{ fontFamily: 'Arial' }}>(Last Name)</h3>
          <h3 style={{ fontFamily: 'Arial' }}>User 0001234</h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
