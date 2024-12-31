// Payment component
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
      setIsProcessing(false);
      alert(paymentMethodRequest.error.message);
    } else {
      if (paymentMethodRequest.paymentIntent.status === 'succeeded') {
        localStorage.removeItem('cart');
        setIsProcessing(false);
        setActiveComponent('Success');

        if (typeof setCartItems === 'function') {
          setCartItems([]);
        }
      }
    }
  };

  if (activeComponent === 'Success') {
    return (
      <Success
        setActiveComponent={setActiveComponent}
        cartItems={cartItems}
        totalPrice={totalPrice.toFixed(2)}
      />
    );
  }
  return (
    <div className="container">
      <div className=" container mt-3">
        <h1>Payment method</h1>
        <h6>For demo purposes only</h6>
        <div class="card card-bordered shadow-none mb-2 mt-2">
          <div class="card-body p-6">
            <div class="d-flex">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="paypal"
                />
                <label class="form-check-label ms-2" for="paypal"></label>
              </div>
              <div>
                <h5 class="mb-1 h6">Payment with Paypal</h5>
                <p class="mb-0 small">
                  You will be redirected to PayPal website to complete your
                  purchase securely.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-bordered shadow-none mb-2">
          <div class="card-body p-6">
            <div class="d-flex mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="creditdebitcard"
                />
                <label
                  class="form-check-label ms-2"
                  for="creditdebitcard"
                ></label>
              </div>
              <div>
                <h5 class="mb-1 h6">Credit / Debit Card</h5>
                <p class="mb-0 small">
                  Safe money transfer using your bank accou k account. We
                  support Mastercard tercard, Visa, Discover and Stripe.
                </p>
              </div>
            </div>
            <div class="row g-2">
              <div class="col-12">
                <div class="col-md-6 col-12">
                  <div class="mb-3 mb-lg-0">
                    <label class="form-label" for="nameoncard">
                      Name on card
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter name"
                      id="nameoncard"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <CardElement />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-gray-400 text-muted">
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
      </div>
    </div>
  );
}

{
  /*
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
      setIsProcessing(false);
      alert(paymentMethodRequest.error.message);
    } else {
      if (paymentMethodRequest.paymentIntent.status === 'succeeded') {
        localStorage.removeItem('cart');
        setIsProcessing(false);
        setActiveComponent('Success');

        if (typeof setCartItems === 'function') {
          setCartItems([]);
        }
      }
    }
  };

  if (activeComponent === 'Success') {
    return (
      <Success
        setActiveComponent={setActiveComponent}
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
*/
}
