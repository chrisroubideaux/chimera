import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Success from './Success';

export default function Payments({ cartItems = [] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Payment');

  const calculateTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // Create a payment intent on your backend
    const response = await fetch(
      'http://localhost:3001/payments/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      }
    );

    const { clientSecret } = await response.json();

    const paymentMethodRequest = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (paymentMethodRequest.error) {
      // Handle error
      setIsProcessing(false);
      alert(paymentMethodRequest.error.message);
    } else {
      if (paymentMethodRequest.paymentIntent.status === 'succeeded') {
        setIsProcessing(false);
        setActiveComponent('Success');
      }
    }
  };

  if (activeComponent === 'Success') {
    return (
      <Success
        setActiveComponent
        cartItems={cartItems}
        totalPrice={totalPrice.toFixed(2)}
      />
    );
  }

  return (
    <div className="container mt-3">
      <h1>Payment method</h1>
      <h6>For demo purposes only</h6>

      <div className="card card-bordered shadow-none mb-2">
        <div className="card-body p-6">
          <div className="d-flex">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="paypal"
              />
              <label className="form-check-label ms-2" htmlFor="paypal">
                PayPal
              </label>
            </div>
            <div>
              <h5 className="mb-1 h6">Payment with PayPal</h5>
              <p className="mb-0 small">
                You will be redirected to the PayPal website to complete your
                purchase securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-bordered shadow-none mb-2">
        <div className="card-body p-6">
          <div className="d-flex mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="creditdebitcard"
              />
              <label
                className="form-check-label ms-2"
                htmlFor="creditdebitcard"
              >
                Credit / Debit Card
              </label>
            </div>
            <div>
              <h5 className="mb-1 h6">Credit / Debit Card</h5>
              <p className="mb-0 small">
                Safe money transfer using your bank account. We support
                Mastercard, Visa, Discover, and Stripe.
              </p>
            </div>
          </div>

          {/* Stripe Elements */}
          <div className="row g-2">
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="card-mask" className="form-label">
                  Card Number
                </label>
                <CardElement />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <button type="button" className="btn btn-sm">
            Prev
          </button>
          <button
            type="submit"
            className="btn btn-sm ms-2"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place order'}
          </button>
        </div>
        <div>
          <h5>Total: ${totalPrice.toFixed(2)}</h5>{' '}
        </div>
      </div>
    </div>
  );
}
