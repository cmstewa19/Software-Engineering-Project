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
          {/* div that holds user's tickets */}
          <div className="ticket-div" style={{
          display:'flex',
          flexDirection:'column',
          width:"95%",
          padding:"5px",
          border:"1px solid black",
          borderRadius:"5px", 
          backgroundColor:"#FFFFFF"
          }}>
          {/* div that displays the user's next ticket */}
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
            
    </>
  );
};

export default Home;
