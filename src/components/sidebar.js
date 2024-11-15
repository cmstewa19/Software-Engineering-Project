import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const styles = {
    sidebar: {
      height: '100vh',
      width: '250px',
      backgroundColor: 'black',
      color: '#40826D',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      position: 'fixed',
    },
    button: {
      backgroundColor: '#40826D',
      color: 'black',
      padding: '10px 20px',
      margin: '10px 0',
      textAlign: 'center',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '16px',
      cursor: 'pointer',
    },
    header: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>Navigation</div>
      <Link to='./pages/browseTrainsPage.js' style={styles.button}>Browse Trains</Link>
      <Link to='./pages/myTickets' style={styles.button}>My Tickets</Link>
      <Link to="./pages/profilePage.js" style={styles.button}>Profile Page</Link>
      <Link to='./pages/loginPage.js' style={styles.button}>Login</Link>
      <Link to='./pages/signupPage.js' style={styles.button}>Sign Up</Link>
    </div>
  );
};

export default Sidebar;

