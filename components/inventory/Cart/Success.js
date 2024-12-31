// Success component
import { useState } from 'react';

const Success = ({
  cartItems = [],
  totalPrice,
  paymentIntentId,
  setActiveComponent,
}) => {
  const [uploadedData, setUploadedData] = useState([]);
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const formattedTime = today.toLocaleTimeString();

  // Handle CSV Upload
  const handleUploadCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split('\n');
        const headers = rows[0].split(',');
        const data = rows.slice(1).map((row) => {
          const values = row.split(',');
          return headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index]?.trim();
            return acc;
          }, {});
        });
        setUploadedData(data);
        console.log('Uploaded Data:', data);
      };
      reader.readAsText(file);
    }
  };

  // Handle CSV Export
  const handleExportCSV = () => {
    const headers = ['Item', 'Quantity', 'Price', 'Total', 'Date', 'Time'];
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const formattedTime = today.toLocaleTimeString();

    const rows = cartItems.map((item) => [
      item.name,
      item.quantity,
      parseFloat(item.price || 0).toFixed(2),
      parseFloat(item.quantity * (item.price || 0)).toFixed(2),
      formattedDate,
      formattedTime,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Payment Successful</h4>
          <div className="d-flex gap-2">
            <a
              className="btn btn-sm"
              href="/InventoryDashboard/InventoryDashboard"
            >
              Inventory
            </a>
            <button onClick={handleExportCSV} className="btn btn-sm ">
              Export Invoice
            </button>
          </div>
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

          {/*
           <div className="mt-4">
            <button onClick={handleExportCSV} className="btn btn-sm me-3">
              Export Invoice as CSV
            </button>
          </div>
          <input
              type="file"
              accept=".csv"
              onChange={handleUploadCSV}
              className="form-control"
            />
          {uploadedData.length > 0 && (
            <div className="mt-4">
              <h5>Uploaded Invoice Details</h5>
              <table className="table table-bordered table-primary">
                <thead>
                  <tr>
                    {Object.keys(uploadedData[0] || {}).map((header, index) => (
                      <th key={index} className="bg-transparent">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="bg-transparent">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            */}
        </div>
      </div>
    </div>
  );
};

export default Success;

{
  /*
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
*/
}
