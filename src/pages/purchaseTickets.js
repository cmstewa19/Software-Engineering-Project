// src/pages/purchaseTickets.js
import React from 'react';
import Payment from '../components/checkoutForm.js'; 
import Header from '../components/header.js'; // header

function PurchaseTickets() {
  return (
    <div>
        <Header />
        <h1>Purchase Your Train Tickets</h1>
        <Payment /> 
    </div>
  );
}

export default PurchaseTickets;
