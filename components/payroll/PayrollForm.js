// Payroll form component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form({ activeEmployeeId }) {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  // put method
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
              <h4 className="card-header-title">Payroll</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                <div className="row mb-4"></div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Displayed on public forums, such as Front."
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="Name"
                        id="NameLabel"
                        placeholder="First Name"
                        value={employee.name}
                        aria-label="First Name"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                      value={employee.email}
                      aria-label="emaile@example.com"
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="emailLabel"
                      placeholder="xxx-xxx-xxxx"
                      value={employee.phone}
                      aria-label="phone"
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
                      type="adreess"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      value={employee.address}
                      aria-label="addresss"
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
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="City"
                      id="CityLabel"
                      placeholder="City"
                      value={employee.city}
                      aria-label="City"
                    />
                    <select id="inputState" className="form-select ">
                      <option selected>State</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>

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
                        name="Employee ID"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        value={employee.empId}
                        aria-label="Employee ID"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        value={employee.socialSec}
                        aria-label="ssn"
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
                        name="Employee ID"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        value={employee.role}
                        aria-label="Employee ID"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        value={employee.title}
                        aria-label="ssn"
                        readOnly={!isEditing}
                        onChange={handleChange}
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
                        value={employee.hireDate}
                        aria-label="Hired"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="lastDayLabel"
                        placeholder="08/10/24"
                        aria-label="Last day"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Wage
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
                        name="wage"
                        id="wageLabel"
                        placeholder="$28.00/hr"
                        value={employee.wage}
                        aria-label="Hired"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="wageLabel"
                        placeholder="$28.00/hr"
                        aria-label="Last day"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Breaks"
                        id="breaksrLabel"
                        placeholder="Breaks"
                        aria-label="Breaks"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="overtime"
                        id="overTime"
                        placeholder="Overtime"
                        aria-label="Overtime"
                        readOnly={!isEditing}
                        onChange={handleChange}
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
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="accountNumber"
                        id="accountNumberLabel"
                        placeholder="Account Number"
                        aria-label="Account Number"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="routingNumber"
                        id="routingNumberLabel"
                        placeholder="Routing Number"
                        aria-label="Routing Number"
                        readOnly={!isEditing}
                        onChange={handleChange}
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
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
              <div className="card-footer pt-0">
                <div className="d-flex justify-content-end gap-3 mt-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleEditClick}
                  >
                    {isEditing ? 'Cancel' : 'Edit Payment'}
                  </button>
                  {isEditing && (
                    <button type="submit" className="btn btn-sm btn-success">
                      Save
                    </button>
                  )}
                  <a className="btn btn-sm" href="#!">
                    Process Payment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form({ activeEmployeeId  }) {
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
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Payroll</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4"></div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                    <i
                      className="bi-question-circle text-body ms-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Displayed on public forums, such as Front."
                    ></i>
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="Name"
                        id="NameLabel"
                        placeholder="First Name"
                        value={employees[0]?.name || ''}
                        aria-label="First Name"
                      />
                    </div>
                  </div>
                </div>
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
                      value={employees[0]?.email || ''}
                      aria-label="emaile@example.com"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="emailLabel"
                      placeholder="xxx-xxx-xxxx"
                      value={employees[0]?.phone || ''}
                      aria-label="phone"
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
                      type="adreess"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      value={employees[0]?.address || ''}
                      aria-label="addresss"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="cityLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="City"
                      id="CityLabel"
                      placeholder="City"
                      value={employees[0]?.city || ''}
                      aria-label="City"
                    />
                    <select id="inputState" className="form-select ">
                      <option selected>State</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>

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
                        name="Employee ID"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        value={employees[0]?.empId || ''}
                        aria-label="Employee ID"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        value={employees[0]?.socialSec || ''}
                        aria-label="ssn"
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
                        name="Employee ID"
                        id="employeeLabel"
                        placeholder="Employee ID"
                        value={employees[0]?.role || ''}
                        aria-label="Employee ID"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        value={employees[0]?.title || ''}
                        aria-label="ssn"
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
                        value={employees[0]?.hireDate || ''}
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
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Wage
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
                        name="wage"
                        id="wageLabel"
                        placeholder="$28.00/hr"
                        value={employees[0]?.wage || ''}
                        aria-label="Hired"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        id="wageLabel"
                        placeholder="$28.00/hr"
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
              </form>
              <div className="card-footer pt-0">
                <div className="d-flex justify-content-end gap-3 mt-2">
                  <a className="btn btn-sm" href="#!">
                    Process Payment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


*/
}
