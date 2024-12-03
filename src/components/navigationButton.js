{/* 
This component is used in many pages for navigation between pages. 

Function: 
  - Takes 'text' (the display text on the button) and 'path' (the destination path the website will be redirected to).
  - For example, to get to home, 'text' = "Home" and 'path' = "/home", the button will navigate to 'localhost:xxxx/home'.
*/}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationButton({ text, path, style, onClick }) {
  if(onClick === undefined) {
    const navigate = useNavigate(); // access the navigate function from React Router
    onClick = () => navigate(path); 
  }
   


  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',        
        maxWidth: '300px',       
        padding: '10px',          
        fontSize: '16px',            
        fontWeight: 'bold',
        fontFamily: 'Arial',
        backgroundColor: 'black',
        color: 'white',
        border: '2px solid black',
        borderRadius: '5px',
        cursor:'pointer',
        ...style,
      }}
    >
      {text} {/* Button display text */}
    </button>
  );
}

// define & require prop types to ensure correct usage of the component
NavigationButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default NavigationButton;
