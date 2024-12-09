import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cart, isCardValid, isCodeValid, isDateValid, selectedPayment }) => {
  const navigate = useNavigate();

  const saveTicketsToDatabase = async () => {
    try {
      // Step 1: Prepare the ticket data
      const tickets = cart.map(item => ({
        train_id: item.trainId,
        departureTime: item.departureTime,
        arrivalTime: item.arrivalTime,
        seatNumber: item.seatNumber,
        price: item.price,
      }));
  
      // Log the prepared tickets to check if the data is correct
      console.log('Prepared tickets:', tickets);
  
      // Step 2: Send the ticket data to the server, relying on the session to get userId
      const response = await fetch('http://localhost:3000/api/save-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets }),
        credentials: 'include', // Include session cookies to send session info
      });
  
      // Log the response status to see if the request was successful
      console.log('Server response status:', response.status);
  
      if (!response.ok) {
        throw new Error('Failed to save tickets.');
      }
  
      console.log('Tickets saved successfully.');
    } catch (error) {
      // Log the error message to understand why the request failed
      console.error('Error saving tickets:', error.message);
    }
  };
  
  

  // Handle the checkout button click
  const handleClick = async () => {
    console.log("Card Valid:", isCardValid);
    console.log("Code Valid:", isCodeValid);
    console.log("Date Valid:", isDateValid);
    console.log("Cart:", cart);
    console.log("Selected Payment:", selectedPayment);
  
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    if (selectedPayment === "New Credit Card") {
      if (!isCardValid) {
        alert("Please enter a valid card number.");
        return;
      }
      if (!isCodeValid) {
        alert("Please enter a valid security code.");
        return;
      }
      if (!isDateValid) {
        alert("Please enter a valid expiration date.");
        return;
      }
    }
    if (cart.length === 0) {
      alert("Must have items in cart to checkout.");
      return;
    }
  
    // Save tickets to the database
    await saveTicketsToDatabase();
  
    navigate("/success");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
