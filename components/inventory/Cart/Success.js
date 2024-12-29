import React from 'react';

const Success = ({ cartItems = [], totalPrice, paymentIntentId }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const formattedTime = today.toLocaleTimeString();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h2>Payment Successful</h2>
        </div>
        <div className="card-body">
          <p className="mb-4">Thank you for your purchase!</p>
          <h5>Invoice</h5>
          <div className="mb-3">
            <strong>Date:</strong> {formattedDate} <br />
            <strong>Time:</strong> {formattedTime} <br />
            <strong>Payment ID:</strong> {paymentIntentId}
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  <strong>Grand Total</strong>
                </td>
                <td>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="alert alert-success mt-4">
            Your payment was processed successfully. We hope to see you again
            soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
