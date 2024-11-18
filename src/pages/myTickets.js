import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from "../components/header.js"; // header
import Sidebar from "../components/sidebar.js"; // sidebar

const MyTickets = () => {
  const [qrCodes, setQrCodes] = useState({}); // Store QR codes by ticket ID
  const [loading, setLoading] = useState(true);

  const tickets = [
    {
      id: "0001",
      origin: "Sioux Falls",
      destination: "Rapid City",
      departureDate: "1/1/2024 10:00A",
      arrivalDate: "1/10/2024 10:00A",
    },
    {
      id: "0002",
      origin: "Omaha",
      destination: "Lincoln",
      departureDate: "1/2/2024 10:00A",
      arrivalDate: "1/2/2024 12:00P",
    },
    {
      id: "0003",
      origin: "Chicago",
      destination: "Detroit",
      departureDate: "1/3/2024 10:00A",
      arrivalDate: "1/3/2024 2:00P",
    },
  ];

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const qrCodePromises = tickets.map((ticket) =>
          axios
            .get(`http://localhost:3000/api/qr/${tickets[0].id}`)
            .then((response) => {
              console.log("QR Code Response:", response.data); // Debug log
              setQrCodeUrl(response.data.qrCode);
            })
            .catch((error) => {
              console.error("Error fetching QR code:", error); // Debug log for error
            });

        const qrCodeData = await Promise.all(qrCodePromises);

        // Map QR code URLs to ticket IDs
        const qrCodeMap = {};
        qrCodeData.forEach(({ id, qrCode }) => {
          qrCodeMap[id] = qrCode;
        });

        setQrCodes(qrCodeMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      }
    };

    fetchQRCodes();
  }, [tickets]);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Sidebar />

      {/* Ticket Container Wrapper */}
      <div style={styles.ticketsWrapper}>
        {tickets.map((ticket) => (
          <div key={ticket.id} style={styles.ticketContainer}>
            {/* Ticket Header */}
            <div style={styles.ticketHeader}>
              <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
              <div style={styles.ticketRoute}>
                <p>
                  <strong>{ticket.origin}</strong> →{" "}
                  <strong>{ticket.destination}</strong>
                </p>
              </div>
            </div>

            {/* Ticket Information */}
            <div style={styles.ticketDetails}>
              <p>
                <strong>Departure:</strong> {ticket.departureDate}
              </p>
              <p>
                <strong>Arrival:</strong> {ticket.arrivalDate}
              </p>
              {loading || !qrCodes[ticket.id] ? (
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
        ))}
      </div>
    </div>
  );
};

const styles = {
  ticketsWrapper: {
    display: "flex",
    flexWrap: "wrap", // Allows items to wrap to the next row
    gap: "20px", // Adds spacing between tickets
    padding: "20px",
  },
  ticketContainer: {
    width: "400px", // Sets a fixed width for tickets
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
    alignItems: "left",
  },
  qrCodeImage: {
    marginTop: "15px",
    width: "120px",
    height: "120px",
  },
};

export default MyTickets;

