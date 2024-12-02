import React, { useState, useEffect } from "react";
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header
import ArrowIcon from '../assets/arrows-icon.webp';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar
import QRCode from '../components/QRCode.js';


// Home Page Component
const Home = ({ tickets, loading }) => {
  const [qrCodes, setQrCodes] = useState({}); // Store QR codes by ticket ID
  const [loadingQR, setLoadingQR] = useState(true); // Track QR loading state
  const navigate = useNavigate();

  // Find the ticket with the soonest departure date
  const soonestTicket = !loading && tickets.length > 0 
    ? tickets.reduce((earliest, current) => {
        return new Date(current.departureDate) < new Date(earliest.departureDate) ? current : earliest;
      }, tickets[0])
    : null;

  function searchTrains() {
    const origin = document.getElementById("origin-field").value;
    const destination = document.getElementById("destination-field").value;
    console.log({origin})
    console.log({destination})
    if(origin == null && destination == null) { navigate("/browse") }
    navigate("/browse?origin="+{origin}+"&destination="+{destination})
  }

  return (
    <>
      
      <Header />
      <Sidebar />

      {/* Profile Card Section */}
      <div className="profile-div" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        width: '40%',
        maxWidth: '600px',
        marginTop: '2%',
        marginLeft: '5%',
        padding: '10px',
        border:'1px solid black',
        borderRadius: '5px',
        backgroundColor: '#40826D',
      }}>
        {/* Ticket Display Section */}
        <div className="ticket-div" onClick={() => navigate('/myTickets')}
         style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:"center",
          justifyContent:"center",
          cursor:"pointer",
          width: '95%',
          padding: '5px',
          paddingBottom: "15px",
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#FEFEFE',
        }}>
          {tickets.length > 0 ? (
            <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
              <h2>{tickets[0].origin} → {tickets[0].destination}</h2>
              <h2>{tickets[0].departureDate}</h2>
              <QRCode />
            </div>
          ) : (
            <h2>No tickets to display</h2>
          )}
        </div>
        
        {/* Button to navigate to My Tickets */}
        <NavigationButton
          text='My Tickets'
          path='/user-tickets'
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            margin: '10px',
          }} 
        />
      </div>

      {/* Train Search Section */}
      <div className="find-train-Div" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '50%',
        marginTop: '2%',
        width: '40%',
        maxWidth: '600px',
        padding: '10px',
        border:'1px solid black',
        borderRadius: '5px',
        backgroundColor: '#40826D',
      }}>
        {/* Input field for origin */}
        <input
          type="text"
          placeholder="From"
          id="origin-field"
          style={{
            width: '75%',
            padding: '10px',
            margin: '5px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        {/* Arrow Icon for separator */}
        <img src={ArrowIcon} style={{ width: "30px", height: "30px", margin: "5px" }} />
        {/* Input field for destination */}
        <input
          type="text"
          placeholder="To"
          id="destination-field"
          style={{
            width: '75%',
            padding: '10px',
            margin: '5px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        <div>
          {/* Navigate to Browse Trains */}
          <NavigationButton 
            text="Search Trains" 
            path="/browse" 
            onClick={searchTrains}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              margin: '5px',
            }}
          />
        </div>
      </div>
    </>
  );
};

// Styles for the ticket display
const styles = {
  ticketsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center", // Center tickets within the wrapper
  },
  ticketContainer: {
    width: "400px",
    border: "5px solid #000",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease", // Smooth transition when enlarging
  },
  ticketHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  ticketTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
  },
  ticketRoute: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
  },
  ticketDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  qrCodeImage: {
    marginTop: "15px",
    width: "120px",
    height: "120px",
  },
};

export default Home;
