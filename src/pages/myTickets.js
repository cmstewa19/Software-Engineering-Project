import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import NavigationButton from "../components/navigationButton.js";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import QRCode from "../components/QRCode.js"; 

const MyTickets = () => {
  const location = useLocation(); // Access the location object
  const ticket = location.state?.ticket; // Extract the ticket data
  document.getElementsByTagName("body")[0].style.backgroundColor="#F5F5F5"; //ensure background color is white

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
                <h2 style={styles.title}>Ticket Info</h2>
                <h2 style={styles.routeInfo}>Ticket ID: {ticket.ticket_id}</h2>
                <h2 style={styles.routeInfo}>Origin: {ticket.origin}</h2>
                <h2 style={styles.routeInfo}>Destination: {ticket.destination}</h2>
                <h2 style={styles.routeInfo}>Seat Number: {ticket.seat_number}</h2>
                <h2 style={styles.routeInfo}>
                  Departure Time: {ticket.departure_time}
                </h2>
                <h2 style={styles.routeInfo}>
                  Arrival Time: {ticket.arrival_time}
                </h2>
              </>
            ) : (
              <p>No ticket selected</p>
            )}
          </div>
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
              <h2 style={styles.title}>Ticket QR: </h2>
              <h2 style={styles.routeInfo}>Ticket ID: {ticket.ticket_id}</h2>
              <div style={styles.routeInfo}>
                <p>
                  <strong>{ticket.origin}</strong> →{" "}
                  <strong>{ticket.destination}</strong>
                </p>
              </div>
              <div style={styles.details}>
              </div>
              <div style={styles.qrCodeWrapper}>
                <QRCode value={`Ticket-${ticket.ticket_id}`} />
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
  title: {
    fontSize: "32px",
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
};

export default MyTickets;
