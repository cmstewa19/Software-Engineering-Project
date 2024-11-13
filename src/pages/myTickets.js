import React from 'react';
import trainPhoto from '../assets/train.jpg'; // photo for login page
//import Nav Button
import NavigationButton from '../components/navigationButton.js'; // nav button
//import header
import Header from '../components/header.js'; // header

const MyTickets = () => {

  //add header
  {/* Header component */}
  <Header />
  
  const ticket = {
    id: "0001",
    origin: "Sioux Falls",
    destination: "Rapid City",
    departureDate: "1/1/2024",
    departureTime: "10:00A"
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <img src="logo_placeholder.png" alt="App Logo" style={styles.logo} />
        <h1 style={styles.appName}>App Name</h1>
        <button style={styles.profileButton}>My Profile</button>
      </header>

      {/* Ticket Info Section */}
      <div style={styles.ticketInfo}>
        <h2 style={styles.ticketTitle}>Ticket #{ticket.id}</h2>
        <p><strong>Origin:</strong> {ticket.origin}</p>
        <p><strong>Destination:</strong> {ticket.destination}</p>
        <p><strong>Departure Date:</strong> {ticket.departureDate}</p>
        <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
      </div>

      {/* QR Code Image Section */}
      <div style={styles.qrCodeContainer}>
        <p>QR Code Image Here</p>
        <div style={styles.qrCodePlaceholder}></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px'
  },
  logo: {
    width: '40px',
    height: '40px'
  },
  appName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  },
  profileButton: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  ticketInfo: {
    width: '100%',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  ticketTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  qrCodeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrCodePlaceholder: {
    width: '200px',
    height: '200px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    marginTop: '10px',
  }
};

export default MyTickets;
