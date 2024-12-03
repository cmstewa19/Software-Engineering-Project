import React from "react";
import NavigationButton from "../components/navigationButton.js"; // nav button
import Header from "../components/header.js"; // header
import Sidebar from "../components/sidebar.js"; // sidebar
import QRCode from "../components/QRCode.js"; // Assuming you're using this library for QR code generation

const MyTickets = ({ tickets, loading }) => {
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
          {/* Ticket Info Display Section */}
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
            }}
          >
            {loading ? (
              <p>Loading tickets...</p>
            ) : tickets[0] ? (
              <>
                <h2 style={styles.ticketTitle}>Ticket ID: {tickets[0]?.id}</h2>
                <h2 style={styles.ticketTitle}>Origin: {tickets[0]?.origin}</h2>
                <h2 style={styles.ticketTitle}>
                  Destination: {tickets[0]?.destination}
                </h2>
                <h2 style={styles.ticketTitle}>
                  Departure Date: {tickets[0]?.departureDate}
                </h2>
                <h2 style={styles.ticketTitle}>
                  Departure Time: {tickets[0]?.departureTime}
                </h2>
              </>
            ) : (
              <p>No tickets available</p>
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
          {loading ? (
            <p>Loading tickets...</p>
          ) : tickets[0] ? (
            <>
              <h2 style={styles.ticketTitle}>Ticket ID: {tickets[0].id}</h2>
              <div style={styles.routeInfo}>
                <p>
                  <strong>{tickets[0].origin}</strong> →{" "}
                  <strong>{tickets[0].destination}</strong>
                </p>
              </div>
              <div style={styles.details}>
                <p>
                  <strong>Departure:</strong> {tickets[0].departureDate}{" "}
                  {tickets[0].departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {tickets[0].arrivalDate}
                </p>
              </div>
              <div style={styles.qrCodeWrapper}>
                <QRCode value={`Ticket-${tickets[0].id}`} />
              </div>
            </>
          ) : (
            <p>No tickets available</p>
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
};

export default MyTickets;
