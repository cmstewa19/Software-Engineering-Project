import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from "../components/header.js"; // header
import Sidebar from "../components/sidebar.js"; // sidebar

const MyTickets = ({ tickets, loading }) => {
  const [qrCodes, setQrCodes] = useState({}); // Store QR codes by ticket ID
  const [loadingQR, setLoadingQR] = useState(true); // Track QR loading state

  // Fetch QR codes on component mount
  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        // Map tickets to promises and await their resolution
        const qrCodePromises = tickets.map(async (ticket) => {
          const response = await axios.get(`http://localhost:3000/api/qr/${ticket.id}`);
          return { id: ticket.id, qrCode: response.data.qrCode }; // Map ticket ID to QR code
        });

        // Await all promises
        const qrCodeData = await Promise.all(qrCodePromises);

        // Map QR code URLs to ticket IDs
        const qrCodeMap = {};
        qrCodeData.forEach(({ id, qrCode }) => {
          qrCodeMap[id] = qrCode;
        });

        // Update state
        setQrCodes(qrCodeMap);
        setLoadingQR(false);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      }
    };

    fetchQRCodes();
  }, [tickets]);

  return (
    <div style={{ overflow: "hidden", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />

      <div style={styles.ticketsWrapper}>
        {loading ? <p>Loading tickets...</p> : (
          tickets.map((ticket) => (
            <div key={ticket.id} style={styles.ticketContainer}>
              <div style={styles.ticketHeader}>
                <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
                <div style={styles.ticketRoute}>
                  <p><strong>{ticket.origin}</strong> → <strong>{ticket.destination}</strong></p>
                </div>
              </div>

              <div style={styles.ticketDetails}>
                <p><strong>Departure:</strong> {ticket.departureDate}</p>
                <p><strong>Arrival:</strong> {ticket.arrivalDate}</p>
                
                {/* Display QR code or loading state */}
                {loadingQR || !qrCodes[ticket.id] ? (
                  <p>Loading QR Code...</p>
                ) : (
                  <img
                    src={qrCodes[ticket.id]}
                    alt={`QR Code for ticket ${ticket.id}`}
                    style={styles.qrCodeImage}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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
    marginLeft: "50px",
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

export default MyTickets;
