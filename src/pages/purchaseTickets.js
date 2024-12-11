import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import NavigationButton from "../components/navigationButton.js";
import Payment from "../components/checkoutForm.js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from "axios";

const stripePromise = loadStripe('pk_test_51QKjDaKo2xrmK8G63Ai8S8y6TR8IxkbGYXkHWUz5uLUvwXnYHSPlZljtjhcRlUyqZUiU1pJ8eKuIIkV7E2ZveVMe00NWWrpysP');

const PurchaseTicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;
  const [clientSecret, setClientSecret] = useState(null);

  const {
    trainCode = '',
    origin = '',
    destination = '',
    departureTime = '',
    arrivalTime = '',
    availableSeats = [],
    selectedSeats = []
  } = location.state || {};

  const [cart, setCart] = useState(location.state?.cart || []);

  useEffect(() => {
    setCart(selectedSeats);
  }, [selectedSeats]);
  
  const saveTicketsToDatabase = async () => {
    try {
      const ticketData = cart.map(ticket => ({
        trainCode: ticket.trainCode,
        origin: ticket.origin,
        destination: ticket.destination,
        departureTime: ticket.departureTime,
        arrivalTime: ticket.arrivalTime,
        seatNumber: ticket.seatNumber,
        qrCode: ticket.qrCode,
        price: ticket.price,
      }));

      // Log the ticket data before sending it
      console.log('Ticket data:', ticketData);

      const response = await fetch('http://localhost:3000/api/purchase-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: ticketData }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save tickets.');
      }

      console.log('Tickets saved successfully.');
    } catch (error) {
      console.error('Error saving tickets:', error.message);
    }
  };

  const handlePaymentSuccess = async (cart) => {
    // After successful payment, save tickets to the database
    await saveTicketsToDatabase();
    navigate("/success");
  };

  return (
    <div style={{ overflowY: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div style={{ width: "40%", maxWidth: "600px", margin: "20px", padding: "20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#40826D", color: "white" }}>
          <h2>Payment Details</h2>
          <Payment cart={cart} handlePaymentSuccess={handlePaymentSuccess} />
        </div>
        <div style={{ width: "40%", maxWidth: "600px", margin: "20px", padding: "20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#40826D", color: "white" }}>
          <div style={{ width: "80%", padding: "10px", backgroundColor: "#40826D", color: "white" }}>
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
              cart.map((ticket, index) => (
                <div key={index} style={{ backgroundColor: "#FEFEFE", color: "black", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                  <h4>Train: {ticket.trainCode || "Unknown"}</h4>
                  <p><strong>{ticket.origin || "Unknown"}</strong> → <strong>{ticket.destination || "Unknown"}</strong></p>
                  <p>Seat: {ticket.seatNumber || "N/A"}</p>
                  <p>Price: ${ticket.price || "0.00"}</p>
                  <button onClick={() => handleRemoveFromCart(index)} style={{ backgroundColor: "#D9534F", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Remove</button>
                </div>
              ))
            ) : (
              <p>No seats selected.</p>
            )}
            <h3>Order Summary</h3>
            <p>Subtotal: ${(cart.length * 9.99).toFixed(2)}</p>
            <p>Handling Fee: $3.99</p>
            <p>Tax: $2.99</p>
            <h4>Total: ${(cart.length * 9.99 + 3.99 + 2.99).toFixed(2)}</h4>
          </div>

          <NavigationButton text="Back to Browse" path="/browse" style={{ padding: "5px 10px", fontSize: "18px", marginTop: "10px", display: "block", textAlign: "center" }} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketsPage;
