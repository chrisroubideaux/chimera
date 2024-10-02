import React, { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '', // Changed to match your schema
    email: '',
    phone: '',
    empId: '', // Changed to match your schema
    requestType: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit form data to backend
      const response = await axios.post('http://localhost:3001/timeOff', {
        name: formData.name, // Schema expects 'name'
        email: formData.email,
        phone: formData.phone,
        empId: formData.empId, // Schema expects 'empId'
        requestType: formData.requestType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        employee: '66d7d2c380470662dbca3239', // Test employee ID
        admin: '66d920a7274f0ef93f9dc3bd', // Test admin ID
      });
      console.log('Time Off Request Submitted:', response.data);
    } catch (error) {
      setError('All fields are required.');
      console.error(error);
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Request Time Off</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <label
                    htmlFor="name"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name" // Matches 'name' from schema
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="email"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email" // Matches 'email' from schema
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="phone"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone" // Matches 'phone' from schema
                      placeholder="xxx-xxx-xxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="empId"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Employee ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="empId" // Matches 'empId' from schema
                      placeholder="Employee ID"
                      value={formData.empId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="requestType"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Request Type
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select fw-normal"
                      name="requestType" // Matches 'requestType' from schema
                      value={formData.requestType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Request Type</option>
                      <option value="Vacation">Vacation</option>
                      <option value="P.T.O">P.T.O</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="startDate"
                    className="col-sm-3 col-form-label form-label"
                  >
                    From
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="startDate" // Matches 'startDate' from schema
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="endDate"
                    className="col-sm-3 col-form-label form-label"
                  >
                    To
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="endDate" // Matches 'endDate' from schema
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Submit
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

export default function Form({}) {
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Request Time Off</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4">
                  <label
                    htmlFor="firstName"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Full Name"
                        required
                      />
                    
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                      />
                   
                      </div>
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="phone"
                        className="col-sm-3 col-form-label form-label"
                      >
                        Phone
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          placeholder="xxx-xxx-xxxx"
                          required
                        />
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="employeeID"
                        className="col-sm-3 col-form-label form-label"
                      >
                        Employee ID
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="employeeID"
                          placeholder="Employee ID"
                          required
                        />
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="requestType"
                        className="col-sm-3 col-form-label form-label"
                      >
                        Request Type
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-select fw-normal"
                          name="requestType"
                          required
                        >
                          <option value="">Request Type</option>
                          <option value="Vacation">Vacation</option>
                          <option value="P.T.O">P.T.O</option>
                          <option value="Personal">Personal</option>
                        </select>
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="startDate"
                        className="col-sm-3 col-form-label form-label"
                      >
                        From
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="date"
                          className="form-control"
                          name="startDate"
                          required
                        />
                      </div>
                    </div>
    
                    <div className="row mb-4">
                      <label
                        htmlFor="endDate"
                        className="col-sm-3 col-form-label form-label"
                      >
                        To
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="date"
                          className="form-control"
                          name="endDate"
                          required
                        />
                      </div>
                    </div>
    
                    <div className="card-footer pt-0">
                      <div className="d-flex justify-content-end gap-3 mt-2">
                        <button type="submit" className="btn btn-primary btn-sm">
                          Submit
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
