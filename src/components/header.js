// Header that is displayed at the top of every page
import React from 'react';
import logo from '../assets/rail.png';
import profileIcon from '../assets/profile-icon.jpg'  
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    return (
        <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        {/* Header Section */}
        <header style={{
            height: '80px',
            backgroundColor: '#40826D',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            justifyContent:'space-between'
        }}>
          <div style={{display:'flex'}}>
            <a href='/home'>
              {/* Logo */}
              <img 
                src={logo} 
                alt="Train Logo" 
                style={{ height: '60px', marginLeft: '20px', marginRight: '20px' }} 
              />
            </a>
            {/* Title */}
            <p style={{
              fontSize: '3rem',    
              fontWeight: 'bold',  
              margin: 0,           
              fontFamily: 'Courier', 
              marginLeft: '10px',  
            }}>
              Train Track
            </p>
          </div>
          <a href='/profile'>
            <img src={profileIcon} style={{
              height:"50px",
              width:'50px',
              borderRadius:'50%',
              border:'2px solid black',
              marginRight:'10px'
            }}/>
          </a>
        </header>
      </div>
    );
}

export default Header;
