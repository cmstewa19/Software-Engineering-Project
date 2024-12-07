import React, { useState, useEffect } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.js";

function UserTickets({ tickets, loading }) {
  const navigate = useNavigate();
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase(); // Normalize query for case-insensitive matching
    const filtered = tickets.filter(
      (ticket) =>
        ticket.id.toString().includes(lowerQuery) ||
        ticket.origin.toLowerCase().includes(lowerQuery) ||
        ticket.destination.toLowerCase().includes(lowerQuery)
    );
    setFilteredTickets(filtered); // Update filtered tickets state
  };

  // Ensure the filtered tickets update if the tickets prop changes
  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

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
                key={ticket.id}
                onClick={() =>
                  navigate("/myTickets", { state: { ticket } }) // Navigate with ticket data
                }
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.id}</td>
                <td>{ticket.origin}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.departureDate}</td>
                <td>{ticket.arrivalDate}</td>
                <td>1</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No tickets found...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTickets;
