import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

// Load Stripe outside the component to avoid reloading it.
const stripePromise = loadStripe('pk_test_51QKjDaKo2xrmK8G63Ai8S8y6TR8IxkbGYXkHWUz5uLUvwXnYHSPlZljtjhcRlUyqZUiU1pJ8eKuIIkV7E2ZveVMe00NWWrpysP'); // Replace with your Stripe publishable key

const CheckoutForm = ({ cart, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      setIsProcessing(true);

      // Calculate total amount in cents
      const amount = cart.reduce((total, seat) => total + seat.price, 0) * 100;

      // Call backend to create payment intent
      const response = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent.");
      }

      // Confirm payment with Stripe.js
      const { clientSecret } = data;
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        alert(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment succeeded!");
        onSuccess();
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: isProcessing ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PurchaseTicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.selectedSeats || []);

  const handleSuccess = () => {
    navigate("/success");
  };

  return (
    <div style={{ overflowY: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        {/* Cart Details Section */}
        <div
          style={{
            width: "40%",
            maxWidth: "600px",
            margin: "20px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((seat, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid white",
                  borderRadius: "5px",
                }}
              >
                <p><strong>Train Code:</strong> {seat.trainCode}</p>
                <p><strong>Origin:</strong> {seat.origin}</p>
                <p><strong>Destination:</strong> {seat.destination}</p>
                <p><strong>Departure Time:</strong> {seat.departureTime}</p>
                <p><strong>Arrival Time:</strong> {seat.arrivalTime}</p>
                <p><strong>Seat Number:</strong> {seat.seatNumber}</p>
                <p><strong>Price:</strong> ${seat.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {/* Payment Details Section */}
        <div
          style={{
            width: "40%",
            maxWidth: "600px",
            margin: "20px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <h2>Payment Details</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} onSuccess={handleSuccess} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketsPage;
