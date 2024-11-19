import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header
import ArrowIcon from '../assets/arrows-icon.webp'
import { useNavigate } from 'react-router-dom';


// Home Page Component
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Header component */}
      <Header />

      {/* div that holds profile card */}
      <div className="profile-div" style={{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:'center',
        float:'left',
        width:"40%", 
        maxWidth:"600px",
        marginTop: "2%", 
        marginLeft: "5%", 
        padding:"10px", 
        borderRadius:"5px", 
        backgroundColor:"#40826D"
      }}>

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
          {/* div that displays the user's next 5 tickets */}
          <div>
            <table id='ticket-table' border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption style={{fontSize:'24px',fontWeight:'bold',margin:'5px'}}>Upcoming Ticket</caption>
            <tbody>
              <tr onClick={() => navigate('/myTickets')} style={{cursor:'pointer'}}>
              <td>Departure Time</td>
              <td>Origin</td>
              <td>Destination</td>
              <td>Quantity</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
        {/* Navigate to My Tickets */}
        <NavigationButton 
          text="My Tickets" 
          path="/user-tickets" 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />
      </div>

      <div className="find-train-Div" style={{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center', 
        marginLeft: "50%", 
        marginTop:"2%", 
        width:"40%", 
        maxWidth:"600px",
        padding:"10px", 
        borderRadius:"5px", 
        backgroundColor:"#40826D"
      }}>
        <input 
          type="text"
          placeholder='From'
          style={{
            width:"75%",
            padding: '10px',
            margin:'5px',
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px'
        }}/>
        <img src={ ArrowIcon }
          style={{
            width:"30px",
            height:"30px",
          }}/>
        <input 
          type="text"
          placeholder='To'
          style={{
            width:"75%",
            padding: '10px',
            margin:"5px",
            fontSize: '16px',
            border: '1px solid black',
            borderRadius: '5px'
        }}/>
        <div>
          {/* Navigate to Browse Trains */}
          <NavigationButton 
            text="Search" 
            path="/browse" 
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              margin: '5px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
