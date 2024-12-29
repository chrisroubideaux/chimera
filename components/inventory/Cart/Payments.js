// Payment component
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function Payments({ cartItems = [] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
        setPaymentSuccess(true);
        setIsProcessing(false);
      }
    }
  };

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
          <button type="button" className="btn btn-outline-gray-400 text-muted">
            Prev
          </button>
          <button
            type="submit"
            className="btn btn-primary ms-2"
            onClick={handlePayment}
            disabled={isProcessing || paymentSuccess}
          >
            {isProcessing ? 'Processing...' : 'PAY'}
          </button>
        </div>
        <div>
          <h5>Total: ${totalPrice.toFixed(2)}</h5>{' '}
          {/* This should show the correct total */}
        </div>
      </div>

      {paymentSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Payment was successful! Thank you for your purchase.
        </div>
      )}
    </div>
  );
}

{
  /*
export default function Payments() {
  return (
    <div className="">
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
                <div class="mb-3">
                  <label for="card-mask" class="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="card-mask"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                </div>
              </div>
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
              <div class="col-md-3 col-12">
                <div class="mb-3 mb-lg-0 position-relative">
                  <label class="form-label" for="expirydate">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="expirydate"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div class="col-md-3 col-12">
                <div class="mb-3 mb-lg-0">
                  <label for="digit-mask" class="form-label">
                    CVV Code
                    <i
                      class="fe fe-help-circle ms-1"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="A 3 - digit number, typically printed on the back of a card."
                    ></i>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    name="digit-mask"
                    id="digit-mask"
                    placeholder="xxx"
                    maxlength="3"
                    inputmode="numeric"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-gray-400 text-muted">
            Prev
          </button>
          <button type="submit" className="btn btn-primary ms-2">
            PAY
          </button>
        </div>
        <div className="alert alert-success mt-3" role="alert">
          Payment was successful! Thank you for your purchase.
        </div>
      </div>
    </div>
  );
}
*/
}
