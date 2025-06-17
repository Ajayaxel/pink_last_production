import { useLocation } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentDetails = () => {
  const location = useLocation();
  const { userId, totalAmount, cartItems = [] } = location.state || {};

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch('https://backend.pinkstories.ae/api/payment/create-payment-intent',  {  

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        alert('✅ Payment successful!');
        // Optional: Redirect or save order
      }
    } catch (err) {
      console.error(err);
      alert('Error while processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

      {/* ...user & product summary same as before */}

      <div className="my-6">
        <CardElement className="border rounded-md p-4" />
      </div>

      <div className="text-right mt-6">
        <h2 className="text-2xl font-bold">Total: AED {totalAmount}</h2>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
