// src/pages/purchaseTickets.js
import React from 'react';
import Payment from '../components/checkoutForm.js'; 
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar

function PurchaseTickets() {
  return (
    <div>
        {/* Sidebar component */}
        <Sidebar />
        <Header />
        <h1>Purchase Your Train Tickets</h1>
        <Payment /> 
    </div>
  );
}

export default PurchaseTickets;
