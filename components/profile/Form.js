import { useState } from 'react';
import axios from 'axios';

export default function TimeOffRequestForm({ currentEmployeeId, adminId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    empId: '',
    requestType: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const currentDate = new Date();
    const startDateObj = new Date(formData.startDate);
    const twoWeeksFromNow = new Date(currentDate);
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);

    // Validate if start date is at least two weeks from today
    if (startDateObj < twoWeeksFromNow) {
      return setError(
        'All time-off requests need two weeks notice from the current date.'
      );
    }

    try {
      const response = await axios.post('http://localhost:3001/timeOff', {
        ...formData, // Spread formData to include all fields
        employee: currentEmployeeId, // Dynamic employee ID
        admin: adminId, // Dynamic admin ID or fallback '66d920a7274f0ef93f9dc3bd'
      });

      // If successful, set success message
      setSuccess('Time-off request submitted successfully!');
    } catch (error) {
      // Set error message if something goes wrong
      setError('There was an issue submitting the request. Please try again.');
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
                      name="name"
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
                      name="email"
                      placeholder="Email"
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
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
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
                      name="empId"
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
                      name="requestType"
                      className="form-select"
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
                    Start Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
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
                    End Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="box">
                  {success && <p className="text-success">{success}</p>}{' '}
                  {error && <p className="text-danger">{error}</p>}
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

{
  /*
import { useState } from 'react';
import axios from 'axios';

export default function TimeOffRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    empId: '',
    requestType: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const currentDate = new Date();
    const startDateObj = new Date(formData.startDate);
    const twoWeeksFromNow = new Date(currentDate);
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);

    // Validate if start date is at least two weeks from today
    if (startDateObj < twoWeeksFromNow) {
      return setError(
        'All time-off requests need two weeks notice from the current date.'
      );
    }

    try {
      const response = await axios.post('http://localhost:3001/timeOff', {
        ...formData, // Spread formData to include all fields
        employee: currentEmployeeId, // Use dynamic employee ID
        admin: adminId || '66d920a7274f0ef93f9dc3bd', // Use dynamic admin ID or fallback to a default test ID
      });

      // If successful, set success message
      setSuccess('Time-off request submitted successfully!');
    } catch (error) {
      // Set error message if something goes wrong
      setError('There was an issue submitting the request. Please try again.');
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
                      name="name"
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
                      name="email"
                      placeholder="Email"
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
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
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
                      name="empId"
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
                      name="requestType"
                      className="form-select"
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
                    Start Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
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
                    End Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="box">
                  {success && <p className="text-success">{success}</p>}{' '}
                  {error && <p className="text-danger">{error}</p>}
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
{
  /*
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(''); // Clear previous messages

  const currentDate = new Date();
  const startDateObj = new Date(formData.startDate);
  const twoWeeksFromNow = new Date(currentDate);
  twoWeeksFromNow.setDate(currentDate.getDate() + 14);

  // Validate if start date is at least two weeks from today
  if (startDateObj < twoWeeksFromNow) {
    return setError(
      'All time-off requests need two weeks notice from the current date.'
    );
  }

  try {
    const response = await axios.post('http://localhost:3001/timeOff', {
      ...formData, // Spread formData to include all fields
      employee: '66d7d2c380470662dbca3239', // Test employee ID
      admin: '66d920a7274f0ef93f9dc3bd', // Test admin ID
    });

    // If successful, set success message
    setSuccess('Time-off request submitted successfully!');
  } catch (error) {
    // Set error message if something goes wrong
    setError('There was an issue submitting the request. Please try again.');
  }
};

*/
}
