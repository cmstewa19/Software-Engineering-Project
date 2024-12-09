import React, { useState, useEffect } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.js";

function UserTickets({ userId }) { // Remove `tickets` and `loading` from props
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]); // Tickets fetched from the database
  const [filteredTickets, setFilteredTickets] = useState([]); // Filtered tickets for search
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch tickets from the database on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/get-tickets?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data); // Update tickets state
        setFilteredTickets(data); // Initialize filtered tickets
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching tickets:", error.message);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase(); // Normalize query for case-insensitive matching
    const filtered = tickets.filter(
      (ticket) =>
        ticket.ticketid.toString().includes(lowerQuery) ||
        ticket.origin.toLowerCase().includes(lowerQuery) ||
        ticket.destination.toLowerCase().includes(lowerQuery)
    );
    setFilteredTickets(filtered); // Update filtered tickets state
  };

  return (
    <div id="purchased-tickets-page">
      <Header />
      <Sidebar />

      <h1>User's Tickets</h1>

      {/* Add SearchBar */}
      <SearchBar onSearch={handleSearch} />

      {/* Table of Tickets */}
      <table
        id="ticket-table"
        border="1"
        cellPadding="10"
        style={{ width: "90%", margin: "50px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* Render filtered tickets */}
          {!loading && filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <tr
                key={ticket.ticketid}
                onClick={() =>
                  navigate("/myTickets", { state: { ticket } }) // Navigate with ticket data
                }
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.ticketid}</td>
                <td>{ticket.origin}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.departure_time}</td>
                <td>{ticket.arrival_time}</td>
                <td>1</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{loading ? "Loading tickets..." : "No tickets found..."}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTickets;
