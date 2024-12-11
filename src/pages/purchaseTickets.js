import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import paymentImage2 from "../assets/paypal_PNG9.png";
import paymentImage1 from "../assets/Visa-Logo-2014-present.jpg";
import paymentImage3 from "../assets/American-Express-Logo.png";
import paymentImage4 from "../assets/Discover-Bank-logo-review-featured-image.png";
import paymentImage5 from "../assets/Mastercard-Logo.png";
import NavigationButton from "../components/navigationButton.js";
import TrainDetails from '../components/trainDetails.js';

const PurchaseTicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

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
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);
  const [codeNumber, setCodeNumber] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [dateNumber, setDateNumber] = useState("");
  const [isDateValid, setIsDateValid] = useState(true);

  const getIssuer = (cardNumber) => {
    if (!cardNumber) return null;
    if (/^4/.test(cardNumber)) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
    if (/^3[47]/.test(cardNumber)) return "American Express";
    if (/^6(?:011|5)/.test(cardNumber)) return "Discover";
    return null;
  };

  useEffect(() => {
    if (selectedPayment === "New Credit Card") {
      const issuer = getIssuer(cardNumber);
      switch (issuer) {
        case "Visa":
          setPaymentImage(paymentImage1);
          break;
        case "American Express":
          setPaymentImage(paymentImage3);
          break;
        case "Discover":
          setPaymentImage(paymentImage4);
          break;
        case "MasterCard":
          setPaymentImage(paymentImage5);
          break;
        default:
          setPaymentImage(null);
      }
    } else if (selectedPayment === "PayPal") {
      setPaymentImage(paymentImage2);
    } else {
      setPaymentImage(null);
    }
  }, [cardNumber, selectedPayment]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    const cardInput = e.target.value;
    const regex = /^[0-9]{16}$/;
    setCardNumber(cardInput);
    setIsCardValid(regex.test(cardInput));
  };

  const handleSecurityCodeChange = (e) => {
    const codeInput = e.target.value;
    const regex = /^[0-9]{3}$/;
    setCodeNumber(codeInput);
    setIsCodeValid(regex.test(codeInput));
  };

  const handleExpDateChange = (e) => {
    const dateInput = e.target.value;
    const regex = /^[01][0-9]\/[0-9]{2}$/;
    setDateNumber(dateInput);
    setIsDateValid(regex.test(dateInput));
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

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

  const handleCheckout = async () => {
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

    // Navigate to success page
    navigate("/success");
  };

  return (
    <div style={{ overflowY: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div style={{ width: "40%", maxWidth: "600px", margin: "20px", padding: "20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#40826D", color: "white" }}>
          <h2>Payment Details</h2>
          <select value={selectedPayment} onChange={handlePaymentChange} style={{ width: "100%", padding: "10px", margin: "10px 0", fontSize: "16px", borderRadius: "5px" }}>
            <option value="">Select Payment Option</option>
            <option value="New Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
          {paymentImage && (
            <img src={paymentImage} alt="Payment Method" style={{ width: "80px", height: "40px", margin: "10px 0" }} />
          )}
          {selectedPayment === "New Credit Card" && (
            <>
              <div>
                <label htmlFor="card-number">Card Number</label>
                <input id="card-number" type="text" value={cardNumber} onChange={handleCardNumberChange} style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }} />
                {!isCardValid && <p style={{ color: "red", fontSize: "12px" }}>Invalid card number</p>}
              </div>
              <div>
                <label htmlFor="security-code">Security Code</label>
                <input id="security-code" type="text" value={codeNumber} onChange={handleSecurityCodeChange} style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }} />
                {!isCodeValid && <p style={{ color: "red", fontSize: "12px" }}>Invalid security code</p>}
              </div>
              <div>
                <label htmlFor="exp-date">Expiration Date (mm/yy)</label>
                <input id="exp-date" type="text" value={dateNumber} onChange={handleExpDateChange} style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px" }} />
                {!isDateValid && <p style={{ color: "red", fontSize: "12px" }}>Invalid expiration date</p>}
              </div>
            </>
          )}
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

          <button
            onClick={handleCheckout}
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

          <NavigationButton text="Back to Browse" path="/browse" style={{ padding: "5px 10px", fontSize: "18px", marginTop: "10px", display: "block", textAlign: "center" }} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketsPage;
