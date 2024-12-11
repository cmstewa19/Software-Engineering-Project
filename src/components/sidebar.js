{/* 
This component is used in header.js. 
Styling is in sidebar.module.css.

Function:
- manages a collapsible sidebar that displays links to other pages when expanded. 

*/}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/logoutButton'; // Import the LogoutButton component
import styles from '../style/sidebar.module.css';

const Sidebar = () => {
  // state to toggle the sidebar expansion (collapsed or expanded)
  const [isExpanded, setIsExpanded] = useState(false);

  // setting CSS variables dynamically based on the sidebar state
  const sidebarStyles = {
    '--sidebar-height': isExpanded ? '100vh' : '7vh',
    '--sidebar-width': isExpanded ? '250px' : '50px',
    '--sidebar-padding': isExpanded ? '20px' : '10px',
    '--button-display': isExpanded ? 'block' : 'none',
    '--header-display': isExpanded ? 'block' : 'none',
  };

  return (
    <div className={styles.container}>
      {/* Sidebar container with dynamic styles applied */}
      <div className={styles.sidebar} style={sidebarStyles}>
        {/* Button to toggle sidebar expansion */}
        <button
          className={`${styles.toggleButton} ${isExpanded ? styles.active : ''}`}
          onClick={() => setIsExpanded(!isExpanded)} // switches the expansion state when clicked
        >
          <span className={styles.arrow}>{isExpanded ? '→' : '←'}</span>
        </button>
        

        {/* Sidebar header */}
        <div className={styles.header}>Navigation</div>

        {/* Links to all of the pages */}        
        <Link to="/home" className={styles.button}>Home</Link>
        <Link to="/browse" className={styles.button}>Browse Trains</Link>
        <Link to="/profile" className={styles.button}>My Profile</Link>
        <Link to="/myTickets" className={styles.button}>My Tickets</Link>
        {/* Logout Button */}
        <div
          style={{
            display: isExpanded ? 'block' : 'none', // Hide button when collapsed
            marginTop: '380px', 
          }}
        >
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
