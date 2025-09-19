import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';


const stripePromise = loadStripe('pk_test_51S7eH5GuIRFurbVKeLxLiJoCX0OZEG8cnkQTxr6FVilojmgAXAisYHiOjMrsjejxEb8oWzh68DdiIq28j61Xh0Y400Q6jh5dcf'); // Replace with your Stripe public key

const PaymentForm = ({ onPaymentSuccess, onCloseCart }) => {
  const { cart, setCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent/`,
        {cart: cart.items},  // Send cart data to backend
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          withCredentials: true,  // Correct placement
        }
      );

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/confirm-payment/`,
          { payment_intent_id: result.paymentIntent.id },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            withCredentials: true,
          }
        );
        toast.success('Payment succeeded! Your order is being processed.', { autoClose: 5000 });
        onPaymentSuccess();
        onCloseCart();
        setCart({ items: [], total: 0 })
        setProcessing(false);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: false }} />
      <button
        disabled={!stripe || processing}
        type="submit"
        className="mt-4 w-full bg-indigo-600 py-2 rounded text-white hover:bg-indigo-700"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const StripePayment = ({ onPaymentSuccess, onCloseCart }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm onPaymentSuccess={onPaymentSuccess} onCloseCart={onCloseCart} />
  </Elements>
);

export default StripePayment;
