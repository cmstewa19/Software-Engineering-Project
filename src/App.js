import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Import page components
import Home from './pages/homePage.js';
import Login from './pages/loginPage.js';
import Signup from './pages/signupPage.js';
import BrowseTrains from './pages/browseTrainsPage.js';
import Profile from "./pages/profilePage.js";
import PurchaseTickets from './pages/purchaseTickets.js';
import Footer from "./components/footerTesting.js"

function LoginPageWithNavigation() {
  const navigate = useNavigate();

  const onNavigate = (page) => navigate(`/${page}`);

  return <Login onNavigate={onNavigate} />;
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPageWithNavigation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/browse" element={<BrowseTrains />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<PurchaseTickets />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;

