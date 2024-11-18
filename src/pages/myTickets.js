import React, { useState, useEffect } from 'react';
import axios from 'axios';
import trainPhoto from '../assets/train.jpg'; // photo for login page
//import Nav Button
import NavigationButton from '../components/navigationButton.js'; // nav button
//import header
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar

const MyTickets = () => {

  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const ticket = {
    id: "0001",
    origin: "Sioux Falls",
    destination: "Rapid City",
    departureDate: "1/1/2024 10:00A",
    arrivalDate: "1/10/2024 10:00A"
  };

  // Fetch QR code from the backend server
  useEffect(() => {
    axios.get(`http://localhost:3000/api/qr/${ticket.id}`)
      .then(response => {
        console.log(response.data); // Log response to check for correct data
        setQrCodeUrl(response.data.qrCode);
      })
      .catch(error => {
        console.error('Error fetching QR code:', error);
      });
  }, [ticket.id]);

 return (
    <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* Sidebar component */}
      <Sidebar />
     
      <div style={styles.ticketContainer}>
        {/* Ticket Header */}
        <div style={styles.ticketHeader}>
          <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
          <div style={styles.ticketRoute}>
            <p><strong>{ticket.origin}</strong> → <strong>{ticket.destination}</strong></p>
          </div>
        </div>

        {/* Ticket Information */}
        <div style={styles.ticketDetails}>
          <p><strong>Departure:</strong> {ticket.departureDate}</p>
          <p><strong>Arrival:</strong> {ticket.arrivalDate}</p>
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" style={styles.qrCodeImage} />
          ) : (
            <p>Loading QR Code...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  ticketContainer: {
    width: '90%',
    maxWidth: '400px',
    border: '5px solid #000',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginLeft: '75px',
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  ticketTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
  },
  ticketRoute: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'black',
  },
  ticketDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  qrCodeImage: {
    marginTop: '15px',
    width: '120px',
    height: '120px',
  }
};

export default MyTickets;
