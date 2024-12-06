import Header from '../components/header.js'; // header
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar

function UserTickets({ tickets, loading }) {
  const navigate = useNavigate();

  return (
    <div id="purchased-tickets-page">
      <Header />
      <Sidebar />

      <h1>User's Tickets</h1>
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
