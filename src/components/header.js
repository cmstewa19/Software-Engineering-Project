import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import logo from '../assets/rail.png';
import styles from '../style/header.module.css';
import Sidebar from './sidebar.js';

function Header() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();  

  // Set CSS variables based on the sidebar state
  const sidebarStyles = {
    '--sidebar-height': isSidebarExpanded ? '100vh' : '7vh',
    '--sidebar-width': isSidebarExpanded ? '250px' : '50px',
    '--sidebar-padding': isSidebarExpanded ? '20px' : '10px',
    '--button-display': isSidebarExpanded ? 'block' : 'none',
    '--header-display': isSidebarExpanded ? 'block' : 'none',
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img 
          src={logo} 
          onClick={() => navigate("/home")}  
          alt="Train Logo" 
        />
        <p className={styles.title}>Train Track</p>
      </div>

      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} styles={sidebarStyles} />
    </header>
  );
}

export default Header;
