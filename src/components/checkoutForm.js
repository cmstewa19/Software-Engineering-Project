// CheckoutForm for payment processing

/*
When you make a payment through the front end (React) it sends a request to
the backend to create a payment intent using the secret key provided by Stripe
The backend generates the client secret key associated with the payment intent and 
returns it to the frontend.
The frontend uses Stripe's .js library to complete the payment by confirming 
payment intent using client secret key.

The publishable key is used in the front end for credit card details and form
components. It identifies your account to the frontend. After the payment method
is created it is sent to the backend where the secret key (which will be stored as 
an env variable and not shared to github) grants access to the full stripe API 
where actual money stuff is done.
*/

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QT65rFfyC9ICmXuEA3u4v1xiJyV2O7AYbRM8rY3b901QO5G898iTOdjyhHLUUzksSQJigDYzGNRFWooVhqkJHtI00k6y5yhhN'); // Replace with your Stripe publishable key

function CheckoutForm() {
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || success}>
        {success ? 'Payment Successful' : 'Pay Now'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
