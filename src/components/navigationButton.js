// takes text (the display text on the button) and path (where the website will be redirected to)
// for example, to get to home, text = "Home"; path = "/home", button takes you to 'localhost:xxxx/home'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationButton({ text, path, style }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
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
      {text}
    </button>
  );
}

NavigationButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default NavigationButton;
