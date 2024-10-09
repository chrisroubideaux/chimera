// Payment Info
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Payments({ employees }) {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState(employees || {});

  // Update employee state when prop changes
  useEffect(() => {
    if (employees) {
      setEmployee(employees);
    }
  }, [employees]);

  if (!employee || Object.keys(employee).length === 0) {
    return <p>No employee data available.</p>;
  }

  // Toggle between edit and view mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Update employee state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('Field Changed:', name, value); // Debugging log
  };

  const handleSaveChanges = async () => {
    try {
      const id = employee._id; // Use _id instead of id
      await axios.put(`http://localhost:3001/employees/${id}`, employee);
      console.log('Employee data updated successfully');

      // Optionally, fetch the updated employee from the server
      const updatedEmployee = await axios.get(
        `http://localhost:3001/employees/${id}`
      );
      setEmployee(updatedEmployee.data);
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert(
        'Failed to save employee data. Check the console for more details.'
      );
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Payment Settings</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                {/* Full Name */}
                <div className="row mb-4">
                  <label
                    htmlFor="nameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="nameLabel"
                      placeholder="Full Name"
                      value={employee.name || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="email@example.com"
                      value={employee.email || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="phoneLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      id="phoneLabel"
                      placeholder="xxx-xxx-xxxx"
                      value={employee.phone || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="homeLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      value={employee.address || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="cityLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      City/St/Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      value={employee.city || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                    {/*
                    <select id="inputState" className="form-select ">
                      <option selected>State</option>
                      <option>...</option>
                    </select>
                    */}
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      id="stateLabel"
                      placeholder="State"
                      value={employee.state || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Hire Date */}

                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Employee ID/ssn
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="empId"
                        id="empIdLabel"
                        placeholder="Employee ID"
                        value={employee.empId || ''}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="socialSec"
                        id="socialSecLabel"
                        placeholder="ssn "
                        value={employee.socialSec || ''}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Role/Ttile
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="Role"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        value={employee.dept || ''}
                        aria-label="Employee ID"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        value={employee.title || ''}
                        aria-label="ssn"
                      />
                    </div>
                  </div>
                </div>
                {/* Wage */}
                <div className="row mb-4">
                  <label
                    htmlFor="wageLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Wage
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="wage"
                      id="wageLabel"
                      placeholder="$28.00/hr"
                      value={employee.wage || ''}
                    />
                  </div>
                </div>

                {/* Additional fields can be added similarly */}
                <div className="row mb-4">
                  <label
                    htmlFor="directDepositLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Hrs/Breaks/OT
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="Hours"
                        id="hoursLabel"
                        placeholder="Hours"
                        aria-label="Hours"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Breaks"
                        id="breaksrLabel"
                        placeholder="Breaks"
                        aria-label="Breaks"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="overtime"
                        id="overTime"
                        placeholder="Overtime"
                        aria-label="Overtime"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Pay Period
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="hired"
                        id="hiredLabel"
                        placeholder="07/22/24"
                        // value={employee.hireDate || ''}
                        aria-label="Hired"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="lastDayLabel"
                        placeholder="08/10/24"
                        aria-label="Last day"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="directDepositLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Direct Deposit Info
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="bankName"
                        id="bankNameLabel"
                        placeholder="Bank Name"
                        aria-label="Bank Name"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="accountNumber"
                        id="accountNumberLabel"
                        placeholder="Account Number"
                        aria-label="Account Number"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="routingNumber"
                        id="routingNumberLabel"
                        placeholder="Routing Number"
                        aria-label="Routing Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="payDateLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Payment Total
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="total"
                      id="payDateLabel"
                      placeholder="Payment Total"
                      aria-label="Payment Total"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="payDateLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Pay Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="payDate"
                      id="payDateLabel"
                      placeholder="Pay Date"
                      aria-label="Pay Date"
                    />
                  </div>
                </div>

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
