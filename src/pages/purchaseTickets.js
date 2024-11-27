// src/pages/purchaseTickets.js
import Payment from '../components/checkoutForm.js'; 
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import paymentImage2 from "../assets/paypal_PNG9.png"; // Example image
import paymentImage1 from "../assets/Visa-Logo-2014-present.jpg"; // Example image


function PurchaseTicketsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables
  const [cart, setCart] = useState(location.state?.cart || []);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);

  // Handle payment type selection
  const handlePaymentChange = (e) => {
    const paymentType = e.target.value;
    setSelectedPayment(paymentType);

    // Dynamically load images based on payment type
    if (paymentType === "Credit Card") {
      setPaymentImage(paymentImage1);
    } else if (paymentType === "PayPal") {
      setPaymentImage(paymentImage2);
    } else {
      setPaymentImage(null);
    }
  };

  // Regex validation for card number
  const handleCardNumberChange = (e) => {
    const cardInput = e.target.value;
    const regex = /^[0-9]{16}$/; // Match 16-digit card numbers
    setCardNumber(cardInput);
    setIsCardValid(regex.test(cardInput));
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Save cart state in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Render component
  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Sidebar />

      <div className="checkout-container">
        {/* Payment Section */}
        <div className="payment-section">
          <h2>Select Payment Option</h2>
          <select
            value={selectedPayment}
            onChange={handlePaymentChange}
            className="payment-dropdown"
          >
            <option value="">Select a payment option</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>

          {/* Payment Image */}
          {paymentImage && (
            <img
              src={paymentImage}
              alt="Payment Method"
              className="payment-image"
            />
          )}

          {/* Card Number Input */}
          <div className="card-input">
            <label htmlFor="card-number">Card Number</label>
            <input
              id="card-number"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className={`card-input-field ${isCardValid ? "" : "invalid"}`}
            />
            {!isCardValid && (
              <p className="error-message">Invalid card number</p>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <p>Ticket #{item.ticketId}</p>
                <p>{item.details}</p>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ${cart.reduce((acc, item) => acc + item.price, 0)}</p>
            <p>Handling Fee: $3.99</p>
            <p>Tax: $2.99</p>
            <h4>
              Total: $
              {(
                cart.reduce((acc, item) => acc + item.price, 0) +
                3.99 +
                2.99
              ).toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseTicketsPage;

