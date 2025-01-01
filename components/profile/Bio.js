import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bio({ employees }) {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState(employees || {});

  useEffect(() => {
    if (employees) {
      setEmployee(employees);
    }
  }, [employees]);

  if (!employee || Object.keys(employee).length === 0) {
    return <p>No employee data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('Field Changed:', name, value);
  };

  const handleSaveChanges = async () => {
    try {
      const id = employee._id;
      await axios.put(
        `https://chimera-h56c.onrender.com/employees/${id}`,
        employee
      );
      console.log('Employee data updated successfully');

      const updatedEmployee = await axios.get(
        `https://chimera-h56c.onrender.com/employees/${id}`
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
              <h4 className="card-header-title">Profile</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
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
                      type="type"
                      className="form-control"
                      name="city"
                      id="cityLabel"
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

                <div className="row mb-4">
                  <label
                    htmlFor="titleLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      id="titleLabel"
                      placeholder="Title"
                      value={employee.title || ''}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="deptLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Dept
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="dept"
                      id="deptLabel"
                      placeholder="Department"
                      value={employee.dept || ''}
                    />
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
                        id="empIdLabel"
                        placeholder="Employee ID"
                        value={employee.empId || ''}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="socialSec"
                        id="socialSecLabel"
                        placeholder="Social Security Number"
                        value={employee.socialSec || ''}
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
                        placeholder="Full name"
                        name="emergencyName"
                        id="emergencyName"
                        value={employee.emergencyName || ''}
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
                    Phone 1
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="xxx-xxx-xxxx"
                      value={employee.emergencyContact1 || ''}
                      readOnly={!isEditing}
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
                        name="firstName"
                        id="firstNameLabel"
                        placeholder="First Name"
                        aria-label="First Name"
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastNameLabel"
                        placeholder="Last Name"
                        aria-label="Last Name"
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
                    Phone 2
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="emailLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="phone"
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Additional fields can be added similarly */}

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
