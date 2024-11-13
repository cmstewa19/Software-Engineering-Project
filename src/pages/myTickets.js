import React, { useState, useEffect } from 'react';
import axios from 'axios';
import trainPhoto from '../assets/train.jpg'; // photo for login page
//import Nav Button
import NavigationButton from '../components/navigationButton.js'; // nav button
//import header
import Header from '../components/header.js'; // header

const MyTickets = () => {

  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const ticket = {
    id: "0001",
    origin: "Sioux Falls",
    destination: "Rapid City",
    departureDate: "1/1/2024 10:00A",
    arrivalDate: "1/10/2024 10:00A"
  };

  useEffect(() => {
  // Fetch QR code from the server
  axios.get(`/api/qr/${ticket.id}`)
    .then(response => {
      console.log(response.data); // Log the response to check the data
      setQrCodeUrl(response.data.qrCode);
    })
    .catch(error => {
      console.error('Error fetching QR code:', error);
    });
}, [ticket.id]);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header component */}
      <Header />

      {/* Button to return to home */}
      <br />
      <div className="d-flex justify-content-center mt-3">
        <NavigationButton
          text="Return to Home"
          path="/home"
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid black',
          }}
        />
      </div>
      <br />

      {/* Ticket Info Section */}
      <div style={styles.ticketInfo}>
        <h2 style={styles.ticketTitle}>Ticket ID:{ticket.id}</h2>
        <p><strong>Origin:</strong> {ticket.origin}</p>
        <p><strong>Destination:</strong> {ticket.destination}</p>
        <p><strong>Departure Date:</strong> {ticket.departureDate}</p>
        <p><strong>Arrival Date:</strong> {ticket.arrivalDate}</p>
      </div>     

      {/* QR Code Image Section */}
      <div style={styles.qrCodeContainer}>
        <p>QR Code Image:</p>
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" style={styles.qrCodeImage} />
        ) : (
          <p>Loading QR Code...</p>
        )}
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
    marginTop: '10px',
  }
};

export default MyTickets;
