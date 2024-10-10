import { useState, useEffect } from 'react';
import axios from 'axios';

const PayrollForm = ({ activeEmployeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch a specific employee based on the activeEmployeeId
    if (activeEmployeeId) {
      axios
        .get(`http://localhost:3001/employees/${activeEmployeeId}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee:', error);
        });
    }
  }, [activeEmployeeId]);

  if (!employee) {
    return <div>Loading employee details...</div>;
  }

  return (
    <div>
      <h4>Payroll for {employee.name}</h4>
      {/* Display employee details */}
      <p>Employee ID: {employee.empId}</p>
      <p>Phone: {employee.phone}</p>
      {/* Render other payroll-related fields */}
    </div>
  );
};

export default PayrollForm;
