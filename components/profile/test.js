import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bio({ employees }) {
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
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
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
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="firstNameLabel"
                      placeholder="Full Name"
                      value={employee.name || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Add similar structure for other fields */}
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

                {/* Add similar input fields as necessary */}

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
