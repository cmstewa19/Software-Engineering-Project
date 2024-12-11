import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QKjDaKo2xrmK8G63Ai8S8y6TR8IxkbGYXkHWUz5uLUvwXnYHSPlZljtjhcRlUyqZUiU1pJ8eKuIIkV7E2ZveVMe00NWWrpysP'); // Replace with your publishable key

function CheckoutForm({ cart, handlePaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Create a Payment Intent when the component mounts
    const createPaymentIntent = async () => {
      console.log('Creating payment intent...');
      try {
        const totalAmount = cart.reduce((total, item) => total + item.price, 0);
        const amountInCents = totalAmount * 100; // Convert to cents
        console.log(`Total amount (in cents): ${amountInCents}`);

        const response = await axios.post(
          'http://localhost:3000/create-payment-intent',
          { amount: amountInCents, currency: 'usd' },
          { withCredentials: true }
        );

        console.log('Payment intent created successfully:', response.data);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        setError('Unable to process payment at this time.');
      }
    };

    if (cart.length > 0) {
      createPaymentIntent();
    }
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('Stripe is not ready. Please try again.');
      console.log('Stripe or elements not ready.');
      return;
    }

    console.log('Stripe and elements are ready. Proceeding with payment confirmation...');

    try {
      const cardElement = elements.getElement(CardElement);
      console.log('Confirming card payment with clientSecret:', clientSecret);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('Payment error:', error.message);
        setError(error.message);
        setSuccess(false);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', paymentIntent);
        setSuccess(true);
        setError(null);

        // Notify parent about successful payment
        handlePaymentSuccess(cart);
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError('An error occurred while processing the payment.');
    }
  };

  if (!clientSecret) {
    console.log('Loading payment form...');
    return <div>Loading payment form...</div>;
  }

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

function PaymentWrapper({ cart, handlePaymentSuccess }) {
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

export default PaymentWrapper;
