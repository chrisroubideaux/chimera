const Success = ({ cartItems = [], totalPrice, paymentIntentId }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const formattedTime = today.toLocaleTimeString();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header ">
          <h4>Payment Successful</h4>
        </div>
        <div className="card-body">
          <p className="mb-4">Thank you for your purchase!</p>
          <h5>Invoice</h5>
          <div className="mb-3">
            <strong>Date:</strong> {formattedDate} <br />
            <strong>Time:</strong> {formattedTime} <br />
            <strong>Payment ID:</strong> {paymentIntentId}
          </div>
          <table className="table table-bordered table-primary">
            <thead>
              <tr>
                <th className="bg-transparent">Item</th>
                <th className="bg-transparent">Quantity</th>
                <th className="bg-transparent">Price</th>
                <th className="bg-transparent">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="bg-transparent table-primary">{item.name}</td>
                  <td className="bg-transparent table-primary">
                    {item.quantity}
                  </td>
                  <td className="bg-transparent">
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </td>
                  <td className="bg-transparent">
                    ${parseFloat(item.quantity * (item.price || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end bg-transparent">
                  <strong>Grand Total</strong>
                </td>
                <td className="bg-transparent">
                  <strong>${parseFloat(totalPrice || 0).toFixed(2)}</strong>
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
