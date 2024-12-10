import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QKjDaKo2xrmK8G63Ai8S8y6TR8IxkbGYXkHWUz5uLUvwXnYHSPlZljtjhcRlUyqZUiU1pJ8eKuIIkV7E2ZveVMe00NWWrpysP'); // Replace with your Stripe publishable key

function CheckoutForm({ cart, handlePaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Calculate the total amount based on the cart items
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    const amountInCents = totalAmount * 100;  // Convert to cents

    try {
      // Step 1: Create Payment Intent on server
      const { clientSecret } = await axios
        .post('http://localhost:3000/create-payment-intent', { amount: amountInCents, currency: 'usd' })
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
        setSuccess(true);
        setError(null);

        // Step 3: Save the tickets to the database after successful payment
        handlePaymentSuccess(cart);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
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

function Payment({ cart, handlePaymentSuccess }) {
  return (
    <div style={paymentContainerStyles}>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} handlePaymentSuccess={handlePaymentSuccess} />
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
