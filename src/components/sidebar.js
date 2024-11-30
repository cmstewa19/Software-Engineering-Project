import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/sidebar.module.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set dynamic CSS variables based on the sidebar state
  const sidebarStyles = {
    '--sidebar-height': isExpanded ? '100vh' : '7vh',
    '--sidebar-width': isExpanded ? '250px' : '50px',
    '--sidebar-padding': isExpanded ? '20px' : '10px',
    '--button-display': isExpanded ? 'block' : 'none',
    '--header-display': isExpanded ? 'block' : 'none',
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar} style={sidebarStyles}>
        <button
          className={`${styles.toggleButton} ${isExpanded ? styles.active : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.arrow}>{isExpanded ? '→' : '←'}</span>
        </button>

        <div className={styles.header}>Navigation</div>
        {/* testing */}
        <Link to="/home" className={styles.button}>Home</Link>
        <Link to="/browse" className={styles.button}>Browse Trains</Link>
        <Link to="/myTickets" className={styles.button}>My Tickets</Link>
        <Link to="/profile" className={styles.button}>Profile Page</Link>
        <Link to="/" className={styles.button}>Login</Link>
        <Link to="/signup" className={styles.button}>Sign Up</Link>
        <Link to="/checkout" className={styles.button}>Checkout</Link>

        {/* final version */}
                
        {/* <Link to="/home" className={styles.button}>Home</Link>
        <Link to="/browse" className={styles.button}>Browse Trains</Link>
        <Link to="/profile" className={styles.button}>My Profile</Link>
        <Link to="/myTickets" className={styles.button}>My Tickets</Link> */}
        
      </div>
    </div>
  );
};

export default Sidebar;
