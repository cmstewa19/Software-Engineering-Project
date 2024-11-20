import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header
import ArrowIcon from '../assets/arrows-icon.webp'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar

const Home = ({ tickets, loading }) => {
  return (
    <>
      <Header />
      <Sidebar />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
        <div className="ticket-div" style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#FFFFFF", width: "95%" }}>
          <table id='ticket-table' border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px' }}>Upcoming Ticket</caption>
            <tbody>
              <tr>
                <td>Departure Time</td>
                <td>Origin</td>
                <td>Destination</td>
                <td>Quantity</td>
              </tr>
              {/* Display the tickets dynamically */}
              {!loading && tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.departureDate}</td>
                    <td>{ticket.origin}</td>
                    <td>{ticket.destination}</td>
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

        {/* Display tickets below the table */}
        <div style={{ marginTop: "20px" }}>
          {loading ? <p>Loading tickets...</p> : (
            <div>
              <h3>Your Tickets</h3>
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

      <NavigationButton text='My Tickets' path='/myTickets' style={{ padding: '10px 20px', fontSize: '18px', margin: '5px' }} />
    </>
  );
};

export default Home;
