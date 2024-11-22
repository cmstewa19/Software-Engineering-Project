import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header
import ArrowIcon from '../assets/arrows-icon.webp';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar
import QRCode from '../components/QRCode.js';


// Home Page Component
const Home = ({ tickets, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Sidebar />

      {/* Profile Card Section */}
      <div className="profile-div" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        width: '40%',
        maxWidth: '600px',
        marginTop: '2%',
        marginLeft: '5%',
        padding: '10px',
        border:'1px solid black',
        borderRadius: '5px',
        backgroundColor: '#40826D',
      }}>
        {/* Ticket Display Section */}
        <div className="ticket-div" onClick={() => navigate('/myTickets')}
         style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:"center",
          cursor:"pointer",
          width: '95%',
          padding: '5px',
          paddingBottom: "15px",
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#FEFEFE',
        }}>
          <h2>{tickets[0].origin} → {tickets[0].destination}</h2>
          <h2>{tickets[0].departureDate}</h2>
          <QRCode/>
        </div>
        
        {/* Button to navigate to My Tickets */}
        <NavigationButton
          text='My Tickets'
          path='/user-tickets'
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            margin: '10px',
          }} 
        />
      </div>

      {/* Train Search Section */}
      <div className="find-train-Div" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '50%',
        marginTop: '2%',
        width: '40%',
        maxWidth: '600px',
        padding: '10px',
        border:'1px solid black',
        borderRadius: '5px',
        backgroundColor: '#40826D',
      }}>
        {/* Input field for origin */}
        <input
          type="text"
          placeholder="From"
          style={{
            width: '75%',
            padding: '10px',
            margin: '5px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        {/* Arrow Icon for separator */}
        <img src={ArrowIcon} style={{ width: "30px", height: "30px", margin: "5px" }} />
        {/* Input field for destination */}
        <input
          type="text"
          placeholder="To"
          style={{
            width: '75%',
            padding: '10px',
            margin: '5px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
        />
        <div>
          {/* Navigate to Browse Trains */}
          <NavigationButton 
            text="Search Trains" 
            path="/browse" 
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              margin: '5px',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

