import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/header.js';
import NavigationButton from '../components/navigationButton.js';

function ChangePasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePassChange = async () => {
    // Validation checks
    if (!password || !confpassword) {
      return setError('All fields are required');
    }

    if (password !== confpassword) {
      return setError('Passwords do not match');
    }

    if (!passwordRegex.test(password)) {
      return setError(
        'Password must be 8+ characters long and contain 1 upper, 1 lowercase, 1 number, 1 special character'
      );
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
        navigate('/profile'); // Redirect to the profile page
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {/* Header component */}
      <Header isLoggedIn={true} />

      {/* Text Header */}
      <h1
        style={{
          fontSize: '50px',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        Change Your Password
      </h1>

      {/* Box */}
      <div
        style={{
          width: '95%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '40px',
          boxSizing: 'border-box',
          textAlign: 'left',
          border: '2px solid #40826D',
          borderRadius: '10px',
          position: 'relative',
          top: '20px',
          height: '65vh',
        }}
      >
        {/* Confirm Email */}
        <div
          style={{
            fontFamily: 'Arial',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Confirm Email:
        </div>

        {/* Email Input */}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            width: '98%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        />

        {/* Create a new password */}
        <div
          style={{
            fontFamily: 'Arial',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Create New Password:
        </div>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '98%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        />

        {/* Confirm new password */}
        <div
          style={{
            fontFamily: 'Arial',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Confirm Password:
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confpassword}
          onChange={(e) => setConfPassword(e.target.value)}
          style={{
            width: '98%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        />

        {/* Error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Button to change the account password */}
        <NavigationButton
          text="Change Password"
          path="/profile"
          onClick={handlePassChange} // Explicitly set onClick to handlePassChange
          style={{
            padding: '10px',
            fontSize: '18px',
            margin: '20px auto',
            color: 'white',
            backgroundColor: '#40826D',
            border: '1px solid #40826D',
            display: 'block',
            marginBottom: '40px',
          }}
        />

        {/* Return to Profile */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Arial',
              fontSize: '15px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginRight: '40px',
            }}
          >
            Don't want to change your password?
          </div>

          <NavigationButton
            text="Return to Profile"
            path="/profile"
            style={{
              padding: '10px',
              fontSize: '15px',
              color: 'black',
              backgroundColor: 'white',
              border: '1px solid #40826D',
              width: '250px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;