import React, { useState, useEffect } from "react";
import Header from '../components/header.js'; // header
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar
import SearchBar from "../components/SearchBar.js"; // SearchBar component


function UserTickets({ tickets, loading }) {
  const navigate = useNavigate();
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  // Handle search queries
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = tickets.filter(
      (ticket) =>
        ticket.id.toString().includes(lowerQuery) ||
        ticket.origin.toLowerCase().includes(lowerQuery) ||
        ticket.destination.toLowerCase().includes(lowerQuery)
    );
    setFilteredTickets(filtered);
  };

  // Update filtered tickets when the tickets prop changes
  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);


  return (
    <div id="purchased-tickets-page">
      <Header />
      <Sidebar />

      <h1>User's Tickets</h1>

      {/* Add SearchBar component */}
      <SearchBar onSearch={handleSearch} />
      
      {/* table to store all of user's tickets */}
      <table
        id="ticket-table"
        border="1"
        cellPadding="10"
        style={{ width: "90%", margin: "50px", borderCollapse: "collapse" }}
      >
        <thead>
          {/* header row */}
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
          {!loading && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() =>
                  navigate("/myTickets", { state: { ticket } }) // Pass ticket data
                }
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.id}</td>
                <td>{ticket.origin}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.departureDate}</td>
                <td>{ticket.arrivalDate}</td>
                <td>1</td> {/* Assuming Quantity is always 1 */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading tickets...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTickets;
