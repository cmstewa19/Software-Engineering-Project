import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Import page components
import Home from './pages/homePage.js';
import Login from './pages/loginPage.js';
import Signup from './pages/signupPage.js';
import BrowseTrains from './pages/browseTrainsPage.js';
import Profile from "./pages/profilePage.js";
import PurchaseTickets from './pages/purchaseTickets.js';
import MyTickets from './pages/myTickets';
import UserTickets from './pages/userTicketsPage.js'

function LoginPageWithNavigation() {
  const navigate = useNavigate();

  const onNavigate = (page) => navigate(`/${page}`);

  return <Login onNavigate={onNavigate} />;
}

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded ticket data (this would normally come from an API)
  const ticketData = [
    {
      id: "0001",
      origin: "Sioux Falls",
      destination: "Rapid City",
      departureDate: "1/1/2024 10:00A",
      arrivalDate: "1/10/2024 10:00A",
    },
    {
      id: "0002",
      origin: "Omaha",
      destination: "Lincoln",
      departureDate: "1/2/2024 10:00A",
      arrivalDate: "1/2/2024 12:00P",
    },
    {
      id: "0003",
      origin: "Chicago",
      destination: "Detroit",
      departureDate: "1/3/2024 10:00A",
      arrivalDate: "1/3/2024 2:00P",
    },
  ];

  // Simulate fetching data and set tickets to the hardcoded data
  useEffect(() => {
    const fetchTickets = async () => {
      setTickets(ticketData);
      setLoading(false);
    };

    fetchTickets();
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPageWithNavigation />} />
            {/* Pass the ticket data as props to Home and MyTickets */}
            <Route path="/home" element={<Home tickets={tickets} loading={loading} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/browse" element={<BrowseTrains />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<PurchaseTickets />} />
            <Route path="/myTickets" element={<MyTickets tickets={tickets} loading={loading} />} />
            <Route path="/user-tickets" element={<UserTickets tickets={tickets} loading={loading} />} />
          </Routes>
        </main> 
      </div>
    </Router>
  );
}

export default App;
