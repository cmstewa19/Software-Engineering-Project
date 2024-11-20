import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from "../components/header.js"; // header
import Sidebar from "../components/sidebar.js"; // sidebar

import React from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

const MyTickets = ({ tickets, loading }) => {
  return (
    <div style={{ overflow: "hidden", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />

      <div style={{ padding: "20px" }}>
        {loading ? <p>Loading tickets...</p> : (
          <div>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={{ marginBottom: "20px" }}>
                <p><strong>{ticket.origin}</strong> → <strong>{ticket.destination}</strong></p>
                <p><strong>Departure:</strong> {ticket.departureDate}</p>
                <p><strong>Arrival:</strong> {ticket.arrivalDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



/*
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
*/
export default MyTickets;

