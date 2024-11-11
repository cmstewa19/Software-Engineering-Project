import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationButton({ text, path, style }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      style={{
        padding: '10px 30px',
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        backgroundColor: 'white',
        border: '2px solid dimgray',
        borderRadius: '10px',
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
};

export default NavigationButton;
