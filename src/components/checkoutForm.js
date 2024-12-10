import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QKjDaKo2xrmK8G63Ai8S8y6TR8IxkbGYXkHWUz5uLUvwXnYHSPlZljtjhcRlUyqZUiU1pJ8eKuIIkV7E2ZveVMe00NWWrpysP'); // Replace with your Stripe publishable key

function CheckoutForm({ handleCheckout }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Step 1: Create Payment Intent on server
    const { clientSecret } = await axios
      .post('http://localhost:3000/create-payment-intent', { amount: 100, currency: 'usd' }) // Set the amount and currency
      .then((res) => res.data);

    // Step 2: Confirm Card Payment
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else if (paymentIntent.status === 'succeeded') {
      setError(null);
      setSuccess(true);
      handleCheckout(); // Call handleCheckout after payment success
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div style={cardElementStyles}>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || success} style={buttonStyles}>
        {success ? 'Payment Successful' : 'Pay Now'}
      </button>
      {error && <div style={errorStyles}>{error}</div>}
    </form>
  );
}

function Payment({ handleCheckout }) {
  return (
    <div style={paymentContainerStyles}>
      <Elements stripe={stripePromise}>
        <CheckoutForm handleCheckout={handleCheckout} />
      </Elements>
    </div>
  );
}

// Styles
const paymentContainerStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const cardElementStyles = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '10px',
  margin: '10px 0',
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const errorStyles = {
  color: 'red',
  fontSize: '14px',
};

export default Payment;
