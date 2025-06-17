import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      const res = await fetch('https://backend.pinkstories.ae/api/payment/create-payment-intent', {
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
        // Navigate to failure page with error details
        navigate('/payment-failed', {
          state: {
            error: result.error.message,
            amount: totalAmount,
            userId: userId,
            cartItems: cartItems
          }
        });
      } else if (result.paymentIntent.status === 'succeeded') {
        // Navigate to success page with payment details
        navigate('/payment-success', {
          state: {
            paymentIntent: result.paymentIntent,
            amount: totalAmount,
            userId: userId,
            cartItems: cartItems
          }
        });
      }
    } catch (err) {
      console.error(err);
      // Navigate to failure page with generic error
      navigate('/payment-failed', {
        state: {
          error: 'An unexpected error occurred while processing your payment',
          amount: totalAmount,
          userId: userId,
          cartItems: cartItems
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if no payment data
  if (!totalAmount || !userId) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

      {/* User & Product Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="mb-2"><span className="font-medium">User ID:</span> {userId}</p>
          <p className="mb-4"><span className="font-medium">Items:</span> {cartItems.length}</p>
          
          {cartItems.length > 0 && (
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded">
                  <img
                    src={item.images?.length ? buildImageUrl(item.images[0]) : '/placeholder-image.jpg'}
                    alt={item.name || 'Product'}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name || 'Product'}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-medium">AED {item.price || 0}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Form */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
        <CardElement 
          className="border rounded-md p-4 bg-gray-50"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      <div className="text-right mt-6">
        <h2 className="text-2xl font-bold text-green-600">Total: AED {totalAmount}</h2>
      </div>

      <div className="mt-8 text-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay AED ${totalAmount}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
