import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import NavigationButton from "../components/navigationButton.js";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import QRCode from "../components/QRCode.js"; 

const MyTickets = () => {
  const [tickets, setTickets] = useState([]); // State to store ticket data
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [error, setError] = useState(null); // To handle any errors during the fetch
  
  const location = useLocation(); // Access the location object
  const navigate = useNavigate(); // For navigation
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/my-tickets', { 
          credentials: 'include', 
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
  
        const data = await response.json();
        setTickets(data); // Store the tickets in the state
      } catch (error) {
        setError(error.message); // Set the error state
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchTickets(); // Call the fetch function when the component is mounted
  }, []); 
  
  
  document.getElementsByTagName("body")[0].style.backgroundColor = "#F5F5F5"; //ensure background color is white

  if (loading) return <div>Loading...</div>; // Display loading state

  if (error) return <div>Error: {error}</div>; // Display error if any

  return (
    <div style={{ overflow: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />

      {/* Left Section - Ticket Information */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div style={{ width: "40%", maxWidth: "600px", margin: "20px", padding: "20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#40826D", color: "white" }}>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket.id} style={{ display: "flex", flexDirection: "column", alignItems: "left", cursor: "pointer", width: "95%", padding: "5px", paddingBottom: "15px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#FEFEFE", color: "black" }}>
                <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
                <h2 style={styles.ticketTitle}>Origin: {ticket.origin}</h2>
                <h2 style={styles.ticketTitle}>Destination: {ticket.destination}</h2>
                <h2 style={styles.ticketTitle}>Departure Date: {ticket.departure_time}</h2>
                <h2 style={styles.ticketTitle}>Departure Time: {ticket.departure_time}</h2>
              </div>
            ))
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
