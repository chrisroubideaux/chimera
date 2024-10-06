import { useState } from 'react';
import axios from 'axios';

export default function EmployeeForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    empId: '',
    socialSec: '',
    hireDate: '',
    endDate: '',
    wage: '',
    emergencyContact1: '',
    emergencyName: '',
    emergencyContact2: '',
    emergencyName2: '',
    timeOffRequest: '',
    dept: '',
    title: '',
    nextShift: '',
    lastShift: '',
    accNumber: '',
    bankName: '',
    directDeposit: '',
    breaks: '',
    hours: '',
    overtime: '',
    experience: '',
  });

  // State for feedback messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/employees',
        formData
      );
      setMessage('Employee added successfully!');
      setError('');
      // Optionally reset the form
      setFormData({
        name: '',
        image: '',
        email: '',
        role: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        empId: '',
        socialSec: '',
        hireDate: '',
        endDate: '',
        wage: '',
        emergencyContact1: '',
        emergencyName: '',
        emergencyContact2: '',
        emergencyName2: '',
        timeOffRequest: '',
        dept: '',
        title: '',
        nextShift: '',
        lastShift: '',
        accNumber: '',
        bankName: '',
        directDeposit: '',
        breaks: '',
        hours: '',
        overtime: '',
        experience: '',
      });
    } catch (err) {
      setError('Failed to add employee. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Add Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="xxx-xxx-xxxx"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    City
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <label className="col-sm-2 col-form-label form-label">
                    State
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="emailLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Id
                    </label>

                    <select id="inputId" className="form-select">
                      <option selected>Id Type</option>
                      <option></option>
                      <option value="2">Drivers Liscense</option>
                      <option value="3">State ID</option>
                      <option value="3">Military ID</option>
                    </select>

                    <select id="inputState" className="form-select ">
                      <option selected> State</option>
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
                        name="empId"
                        value={formData.empId}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        required
                      />

                      <input
                        type="text"
                        className="form-control"
                        name="socialSec"
                        placeholder="Ssn"
                        aria-label="ssn"
                        value={formData.socialSec}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Role
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder=" Role"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Dept
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dept"
                      value={formData.dept}
                      onChange={handleChange}
                      placeholder="Dept"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Start/End Wage
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
                        placeholder="$00.00/hr"
                        aria-label="Wage"
                        value={formData.wage}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="EndWage"
                        id="wageLabel"
                        placeholder="$00.00/hr"
                        aria-label="End Wage"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Start/End Date
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
                        type="date"
                        className="form-control"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        placeholder="00/00/00"
                      />

                      <input
                        type="text"
                        className="form-control"
                        name="Lastday"
                        placeholder="07/22/24"
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
                    Emergency 1
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
                        name="emergencyName"
                        placeholder="First Name"
                        value={formData.emergencyName}
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
                    Phone 1
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyContact1"
                      placeholder="xxx-xxx-xxxx"
                      value={formData.emergencyContact1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Emergency 2
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
                        name="emergencyName"
                        placeholder="First Name"
                        value={formData.emergencyName2}
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
                    Phone 2
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyContact2"
                      placeholder="xxx-xxx-xxxx"
                      value={formData.emergencyContact2}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Add Employee
                    </button>
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

{
  /*
import { useState } from 'react';
import axios from 'axios';

export default function EmployeeForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    empId: '',
    socialSec: '',
    hireDate: '',
    endDate: '',
    wage: '',
    emergencyContact1: '',
    emergencyContact2: '',
    timeOffRequest: '',
    dept: '',
    title: '',
    nextShift: '',
    lastShift: '',
    accNumber: '',
    bankName: '',
    directDeposit: '',
    breaks: '',
    hours: '',
    overtime: '',
    experience: '',
  });

  // State for feedback messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/employees',
        formData
      );
      setMessage('Employee added successfully!');
      setError('');
      // Optionally reset the form
      setFormData({
        name: '',
        email: '',
        role: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        empId: '',
        socialSec: '',
        hireDate: '',
        endDate: '',
        wage: '',
        emergencyContact1: '',
        emergencyContact2: '',
        timeOffRequest: '',
        dept: '',
        title: '',
        nextShift: '',
        lastShift: '',
        accNumber: '',
        bankName: '',
        directDeposit: '',
        breaks: '',
        hours: '',
        overtime: '',
        experience: '',
      });
    } catch (err) {
      setError('Failed to add employee. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Add Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>

              
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="xxx-xxx-xxxx"
                      required
                    />
                  </div>
                </div>

              
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                </div>

             
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    City
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <label className="col-sm-2 col-form-label form-label">
                    State
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

               
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Employee ID
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="empId"
                      value={formData.empId}
                      onChange={handleChange}
                      placeholder="Employee ID"
                      required
                    />
                  </div>
                  <label className="col-sm-2 col-form-label form-label">
                    SSN
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="socialSec"
                      value={formData.socialSec}
                      onChange={handleChange}
                      placeholder="xxx-xx-xxxx"
                      required
                    />
                  </div>
                </div>

              
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Role
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Employee Role"
                      required
                    />
                  </div>
                </div>

            
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Add Employee
                    </button>
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
*/
}
