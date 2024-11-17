{/* 
  I didn't include the flex containers in this file because it 
  screws up the button layout for the Payment Info tab. I'd 
  personally rather not deal with it lol
  */}

import React from 'react';

{/* Divider used in the Profile Page */}
function Divider({ style }) {
  return (
    <hr
      style={{
        flexGrow: 1,
        border: 'none',
        borderTop: '2px solid #40826D',
        marginRight: '20px',
        ...style,
      }}
    />
  );
}

export default Divider;
