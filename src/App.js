import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Import your page components
import Home from './pages/homePage.js';
import Login from './pages/loginPage.js';
import Signup from './pages/signupPage.js';
import BrowseTrains from './pages/browseTrainsPage.js';
import Profile from "./pages/profilePage.js";
import MyTickets from './pages/MyTickets';

function LoginPageWithNavigation() {
  const navigate = useNavigate();

  const onNavigate = (page) => navigate(`/${page}`);

  return <Login onNavigate={onNavigate} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPageWithNavigation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/browse" element={<BrowseTrains />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path ="/myTickets" element={<MyTickets />} />
        {/* <Route path="/checkout" element={<Purchase />} /> */}

      </Routes>
    </Router>
  );
}

export default App;

