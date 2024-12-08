// Form for login page
// Will need to take input in the future
import React, { useState, useEffect } from 'react';
import NavigationButton from '../components/navigationButton';


function UsernamePasswordForm({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  

  const handlePassChange = async () => {
    // Validation checks
    if (!email || !password || !confpassword) {
      return setError('All fields are required');
    }

    if(!password === confpassword) {
        return setError('Passwords do not match');
    }

    if(!passwordRegex.test(password)) {
        return setError('Password must be 8+ characters long and contain 1 upper, 1 lowercase, 1 number, 1 special character');
    }

    try {
      const response = await fetch('http://localhost:3000/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password Changed Successfully!');
        navigate('/home'); // Redirect to home page
      } else {
        setError(data.error || 'Something went wrong');
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

      {/* Password Input */}
      <input
        type="password"
        value={confpassword}
        onChange={(e) => setConfPassword(e.target.value)}
        placeholder="Confirm Password"
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
        text="Change Password"
        path="/home"
        onClick={handlePassChange}
        style={{
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          marginBottom: '20px',
          padding: '10px',
        }}
      />
    </div>
  );
}

export default UsernamePasswordForm;
