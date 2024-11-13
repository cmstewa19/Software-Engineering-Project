// footer for easy page access testing
import React from 'react';
import NavigationButton from './navigationButton.js';

function Footer() {
  return (
    <footer style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #ccc' }}>
      <NavigationButton text="Login" path="/" />
      <NavigationButton text="Home" path="/home" />
      <NavigationButton text="Signup" path="/signup" />
      <NavigationButton text="Browse Trains" path="/browse" />
      <NavigationButton text="Profile" path="/profile" />
      <NavigationButton text="Checkout" path="/checkout" />
    </footer>
  );
}

export default Footer;
