import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cart, isCardValid, isCodeValid, isDateValid, selectedPayment }) => {
  const navigate = useNavigate();

  const getUserIdFromSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for session
      });
  
      if (!response.ok) {
        throw new Error('Failed to retrieve user session.');
      }
  
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error('Error retrieving session:', error.message);
      return null; // Handle appropriately in your flow
    }
  };
  

  const saveTicketsToDatabase = async () => {
    try {
      const userId = await getUserIdFromSession(); // Retrieve user ID from session
  
      if (!userId) {
        alert('Unable to save tickets: User not logged in.');
        return;
      }
  
      const response = await fetch('/api/save-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: cart, userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save tickets.');
      }
  
      console.log('Tickets saved successfully.');
    } catch (error) {
      console.error('Error saving tickets:', error.message);
    }
  };
  
  

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
