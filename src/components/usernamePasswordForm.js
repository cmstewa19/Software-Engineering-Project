// Form for login page
// Will need to take input in the future
import React, { useState, useEffect } from 'react';
import NavigationButton from '../components/navigationButton';


function UsernamePasswordForm({ navigate, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const container = document.getElementById("container");
  

  const handleLogin = async () => {
    // Validation checks
    if (!email || !password) {
      return setError('Both email and password are required.');
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        alert('Login successful!');
        navigate('/home'); // Redirect to home page
      } else {
        //create anchor element
        document.getElementById("forgot-password-anchor").style.visibility = "visible";
        setError(data.error || 'Failed to log in.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred. Please try again later.');
    }
  };


  return (
    <div
      className="bg-light border border-light rounded d-flex flex-column align-items-center"
      id="container"
      style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        boxSizing: 'border-box',
        textAlign: 'center',
        border: '2px solid #40826D',
        borderRadius: '10px',
      }}
    >
      {/* Welcome Message */}
      <h2 style={{ fontFamily: 'Courier', fontSize: '2rem', marginBottom: '20px' }}>
        Welcome!
      </h2>

      {/* Email Input */}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      />

      {/* Password Input */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      />

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Login Button */}
      <NavigationButton
        text="Login"
        path="/home"
        onClick={handleLogin}
        style={{
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          marginBottom: '20px',
          padding: '10px',
        }}
      />
      <a id="forgot-password-anchor" href='/forgot-password' style={{visibility:"hidden"}}>
        forgot password?
      </a>
    </div>
  );
}

export default UsernamePasswordForm;
