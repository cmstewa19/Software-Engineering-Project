{/* 
This component is used in login and signup pages. Does not use Sidebar component.
Formatting is in style/header.module.css

Function: header across pages, displays logo, title. 
*/}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import logo from '../assets/rail.png';
import styles from '../style/header.module.css';

function HeaderNoSidebar({isLoggedIn = true}) {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Shows logo, navigates to homePage if clicked */}
        <img className={isLoggedIn ? styles.pointer : styles.noPointer}
          src={logo} 
          onClick={isLoggedIn ? () => navigate("/home") : () => {}}  
          alt="Train Logo" 
        />
        <p className={styles.title}>Train Track</p>
      </div>
    </header>
  );
}

export default HeaderNoSidebar;
