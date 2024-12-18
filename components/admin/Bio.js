// Bio component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bio({ admins }) {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState(admins);

  useEffect(() => {
    if (admins) {
      setAdmin(admins);
    }
  }, [admins]);

  if (!admin || Object.keys(admin).length === 0) {
    return <p>No employee data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = admin._id;
      await axios.put(`https://chimera-h56c.onrender.com/admins/${id}`, admin);
      console.log('Employee data updated successfully');

      const updatedAdmin = await axios.get(
        `https://chimera-h56c.onrender.com/admins/${id}`
      );
      setAdmin(updatedAdmin.data);
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
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="firstNameLabel"
                        placeholder="Full Name"
                        aria-label="Full Name"
                        value={admin.name}
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
                      aria-label="Email"
                      value={admin.email}
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
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phoneLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="Phone"
                      value={admin.phone || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Add more fields for other admin information similar to the structure above */}
                <div className="row mb-4">
                  <label
                    htmlFor="roleLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Role
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      id="roleLabel"
                      placeholder="Role"
                      aria-label="Role"
                      value={admin.role}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="addressLabel"
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
                      aria-label="Address"
                      value={admin.address}
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
                      type="type"
                      className="form-control"
                      name="city"
                      id="cityLabel"
                      placeholder="1234 Main St"
                      value={admin.city || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />

                    {/*
                    <select
                      id="inputState"
                      className="form-select "
                      value={admins.state}
                      disabled={!isEditing}
                    >
                      <option selected>State</option>
                      <option
                        value={admins.state}
                        readOnly={!isEditing}
                        onChange={handleChange}
                      ></option>
                    </select>
                    */}
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      id="stateLabel"
                      placeholder="State"
                      value={admin.state || ''}
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
                        placeholder="EmpId"
                        value={admin.empId || ''}
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="socialSec"
                        placeholder="Social Security Number"
                        value={admin.socialSec || ''}
                        readOnly={!isEditing}
                        onChange={handleChange}
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
                      placeholder="$00.00"
                      value={admin.wage || ''}
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
                        value={admin.emergencyName || ''}
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
                      value={admin.emergencyContact1 || ''}
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

                {/* footer */}
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

{
  /*
import { useState } from 'react';

export default function Bio({ admins }) {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState(admins);

  if (!admins || Object.keys(admins).length === 0) {
    return <p>No admin data available.</p>;
  }

  const handleEditClick = () => {
    if (isEditing) {
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const id = admin.id;
      await axios.put(`http://localhost:3001/admins/${id}`, admin);
      console.log('Admin data updated successfully');
      const updatedAdmin = await axios.get(
        `http://localhost:3001/admins/${id}`
      );
      setAdmin(updatedAdmin.data);
    } catch (error) {
      console.error('Error updating admin data:', error);
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
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="firstNameLabel"
                        placeholder="Full Name"
                        aria-label="Full Name"
                        value={admin.name}
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
                      aria-label="Email"
                      value={admin.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="roleLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Role
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      id="roleLabel"
                      placeholder="Role"
                      aria-label="Role"
                      value={admin.role}
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
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phoneLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="Phone"
                      value={admin.phone || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="addressLabel"
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
                      aria-label="Address"
                      value={admin.address}
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
                      value={admins.city}
                      aria-label="City"
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                    <select
                      id="inputState"
                      className="form-select "
                      value={admins.state}
                      disabled={!isEditing}
                    >
                      <option selected>State</option>
                      <option
                        value={admins.state}
                        readOnly={!isEditing}
                        onChange={handleChange}
                      ></option>
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
                        aria-label="Employee ID"
                        value={admins.empId}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="ssn"
                        id="ssn"
                        placeholder="Social security"
                        aria-label="ssn"
                        value={admins.socialSec}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="hireDateLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Hire Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="hireDate"
                      id="hireDateLabel"
                      placeholder="mm/dd/yyyy"
                      aria-label="Hire Date"
                      value={admins.hireDate}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
                      placeholder="$00.00/hr"
                      aria-label="Wage"
                      value={admins.wage}
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
                        name="firstName"
                        id="firstNameLabel"
                        placeholder="Full name"
                        aria-label="Full Name"
                        value={admins.emergencyName}
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
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="emailLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="phone"
                      value={admins.emergencyContact1}
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
              </form>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
