import React, { useState } from 'react';
import logo from './assets/ScenicTrain1.jpg'; // photo for login page


// creates login page. 
function Login({ onNavigate }) {
    return (
      <div>
  
        {/* Creates the green header at top of log in page */}
        <div style={{ 
          backgroundColor: 'darkseagreen', 
          width: '1739px', 
          height: '100px'
          }}></div>
        
        {/* Name of the company at the top of log in page */}
        <p style={{ 
          position: 'absolute', 
          top: '0px', 
          left:'30px', 
          fontSize: '40px', 
          fontWeight: 'bold', 
          fontFamily: 'Courier'
          }}>Train Track</p>
  
        {/* Image for the log in page */}
        <img src={logo} alt="ScenicTrain1"style={{ 
          position: 'absolute',
          width: '900px', 
          marginBottom: '20px',
          top: '200px',
          left: '750px',
          borderRadius: '10px'
          }}/>
  
        {/* Creates the gray box that has all the log in information inside*/}
        <div style={{ 
          width: 600, 
          height: 600, 
          backgroundColor: 'lightgray', 
          border: '1px solid lightgray', 
          margintop: '20px',
          position: 'absolute',
          top: '200px', 
          left: '100px',
          borderRadius: '10px'
          }}>
  
            <br />
            <h2 style={{ textAlign: 'center', fontFamily: 'Courier', fontSize: '40px' }}>Welcome!</h2>
            <br />
            <br />
            <br />
  
            {/* Input box for username */}
            <label style={{
              fontFamily: 'Arial', 
              fontSize: '20px', 
              position: 'absolute', 
              top: '160px', 
              left: '55px' 
              }}>Enter your username:<br /></label>
  
              <input
                type="text"
                style={{
                  width: '500px',
                  padding: '10px',
                  marginTop: '10px',
                  fontSize: '18px',
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '10px'
                }}/><br />
            
            {/* Input box for password */}
            <label style={{ 
              fontFamily: 'Arial',
              fontSize: '20px',  
              position: 'absolute', 
              top: '230px', 
              left: '55px' }}>
              <br />Enter your password:</label>
  
              <br />
              <input
                type="password"
                style={{
                  width: '500px',
                  padding: '10px',
                  marginTop: '10px',
                  fontSize: '18px',
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '10px'
                }}/><br />
  
            {/* Log in button (currently redirects to home page, no security measures rn) */}
            <button onClick={() => onNavigate('home')}
              style={{
                position: 'absolute',
                top: '350px',
                left: '225px',
                padding: '10px 30px',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                backgroundColor: 'darkseagreen',
                border: '3px solid darkgreen',
                borderRadius: '10px'
              }}>Log In</button>
  
            {/* Label for going to the sign up page */}
            <h2 style ={{
              position: 'absolute',
              top: '455px',
              left: '110px',
              fontFamily: 'Arial',
              fontSize: '17px'
            }}>Don't have an account?</h2> 
  
            {/* Sign up button (Redirects to sign up page) */ }
            <button onClick={() => onNavigate('signup')}
              style={{
                position: 'absolute',
                top: '455px',
                left: '320px',
                padding: '10px 30px',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                backgroundColor: 'white',
                border: '2px solid dimgray',
                borderRadius: '10px'
              }}>Sign Up</button>
          </div>
        {/* <button onClick={() => onNavigate('home')}>Go to Home Page</button> */}
      </div>
    );
  }
export default Login;