import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; // Import useLocation
import NavigationButton from "../components/navigationButton.js";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import QRCode from "../components/QRCode.js"; 
import TrainRouteMap from '../components/trainRouteMap.js';

const MyTickets = () => {
  const location = useLocation(); // Access the location object
  const ticket = location.state?.ticket; // Extract the ticket data
  const [mapCenter, setMapCenter] = useState(null);  
  return (
    <div
      style={{
        overflow: "auto", // scroll
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Sidebar />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        {/* Left Section - Ticket Information */}
        <div
          style={{
            width: "40%",
            maxWidth: "600px",
            margin: "20px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              cursor: "pointer",
              width: "95%",
              padding: "5px",
              paddingBottom: "15px",
              border: "1px solid black",
              borderRadius: "5px",
              backgroundColor: "#FEFEFE",
              color: "black",
            }}
          >
            {ticket ? (
              <>
                <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
                <h2 style={styles.ticketTitle}>Origin: {ticket.origin}</h2>
                <h2 style={styles.ticketTitle}>Destination: {ticket.destination}</h2>
                <h2 style={styles.ticketTitle}>
                  Departure Date: {ticket.departureDate}
                </h2>
                <h2 style={styles.ticketTitle}>
                  Departure Time: {ticket.departureTime}
                </h2>
              </>
            ) : (
              <p>No ticket selected</p>
            )}
          </div>
        </div>

        {/* Train Route Map */}
        <div className={styles.trainRouteMapContainer}>
          {mapCenter && (
            <TrainRouteMap 
              origin={ticket.origin} 
              destination={ticket.destination} 
              center={mapCenter} 
            />
          )}
        </div>

        {/* Ticket Display */}
        <div
          style={{
            width: "80%",
            maxWidth: "700px",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            color: "black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {ticket ? (
            <>
              <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
              <div style={styles.routeInfo}>
                <p>
                  <strong>{ticket.origin}</strong> →{" "}
                  <strong>{ticket.destination}</strong>
                </p>
              </div>
              <div style={styles.details}>
                <p>
                  <strong>Departure:</strong> {ticket.departureDate}{" "}
                  {ticket.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {ticket.arrivalDate}
                </p>
              </div>
              <div style={styles.qrCodeWrapper}>
                <QRCode value={`Ticket-${ticket.id}`} />
              </div>
            </>
          ) : (
            <p>No ticket selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Updated styles for the new ticket display
const styles = {
  ticketTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  routeInfo: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  details: {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  qrCodeWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  trainRouteMapContainer: {
    width: "500px",
    marginTop: "170px",
    marginLeft: "30px",
    height: "350px", 
    position: "fixed", 
  }
};

export default MyTickets;
