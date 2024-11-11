import React from 'react';

function UsernamePasswordForm() {
  return (
    <div className="bg-light border border-light rounded" style={{ width: '80%', maxWidth: '400px', padding: '20px', boxSizing: 'border-box' }}>

      {/* Input for username */}
      <label
        style={{
          fontFamily: 'Arial',
          fontSize: '20px',
          display: 'block',
          marginBottom: '5px',
        }}
      >
        Enter your username:
      </label>
      <input
        type="text"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '18px',
          border: '1px solid black',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      />

      {/* Input for password */}
      <label
        style={{
          fontFamily: 'Arial',
          fontSize: '20px',
          display: 'block',
          marginBottom: '5px',
        }}
      >
        Enter your password:
      </label>
      <input
        type="password"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '18px',
          border: '1px solid black',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      />
    </div>
  );
}

export default UsernamePasswordForm;
