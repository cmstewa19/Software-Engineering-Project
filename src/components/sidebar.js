import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    sidebar: {
      height: '100vh',
      width: isExpanded ? '250px' : '50px', // Expand or collapse width
      backgroundColor: 'black',
      color: '#40826D',
      display: 'flex',
      flexDirection: 'column',
      padding: isExpanded ? '20px' : '10px',
      position: 'fixed',
      transition: 'width 0.3s ease',
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
      display: isExpanded ? 'block' : 'none', // Hide buttons when collapsed
    },
    toggleButton: {
      backgroundColor: 'black',
      color: '#40826D',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      padding: '10px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrow: {
      fontSize: '16px',
    },
    header: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: isExpanded ? 'block' : 'none', // Hide header when collapsed
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* Toggle Button */}
        <button
          style={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span style={styles.arrow}>{isExpanded ? '←' : '→'}</span>
        </button>

        {/* Navigation Links */}
        <div style={styles.header}>Navigation</div>
        <Link to='./pages/browseTrainsPage.js' style={styles.button}>Browse Trains</Link>
        <Link to='./pages/myTickets' style={styles.button}>My Tickets</Link>
        <Link to="./pages/profilePage.js" style={styles.button}>Profile Page</Link>
        <Link to='./pages/loginPage.js' style={styles.button}>Login</Link>
        <Link to='./pages/signupPage.js' style={styles.button}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Sidebar;
