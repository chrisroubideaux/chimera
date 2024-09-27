// Create event component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Calendar from './Calendar';

const today = format(new Date(), 'MM/dd/yyyy');

export default function CreateEvent({ meetings }) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [eventType, setEventType] = useState(''); // For selecting event type
  const [selectedTime, setSelectedTime] = useState(''); // For selecting time
  const [invitee, setInvitee] = useState(''); // For selecting invitee
  const [subject, setSubject] = useState(''); // For the subject
  const [showAlert, setShowAlert] = useState(false); // For alert
  const [alertMessage, setAlertMessage] = useState(''); // Alert message
  const [employees, setEmployees] = useState('');

  const handleDateSelection = (date) => {
    setSelectedDate(format(date, 'MM/dd/yyyy'));
    setShowDatePickerModal(false);
  };

  const handleSubmit = async () => {
    const newMeeting = {
      senderId: '66d920a7274f0ef93f9dc3bd', // Set the correct sender ID
      senderModel: 'Admin',
      recipientIds: [invitee], // Make this an array for multiple recipients
      recipientModel: 'Employee',
      isVideo: true,
      description: subject, // Use the subject for the description
      times: '8:00AM-4:00PM', // Assuming fixed times; you may adjust as needed
      slot: selectedTime, // Align this with the selected time
      days: [selectedDate], // Use the selected date for days
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/meetings',
        newMeeting
      );
      if (response.status === 200) {
        // Handle successful booking
        setEventType('');
        setSelectedTime('');
        setInvitee('');
        setSubject('');
        setAlertMessage('Meeting booked successfully!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Error booking meeting. Please try again.');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees'); // Replace with your API endpoint
        setEmployees(response.data); // Assuming the employee data is in response.data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      {/* Modal for Creating Event */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Choose a date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-md bg-transparent align-items-center w-100"
                  onClick={() => setShowDatePickerModal(true)}
                >
                  <Calendar onSelectDate={handleDateSelection} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePickerModal && (
        <div
          className="modal fade show"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                  Choose a Date
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDatePickerModal(false)}
                ></button>
              </div>
              <div className="modal-body w-100">
                {showAlert && (
                  <div
                    className="card mb-2"
                    style={{ maxWidth: '540px' }}
                    role="alert"
                  >
                    <div className="card-body">
                      <p className="fs-6">
                        {alertMessage} || {selectedDate}
                      </p>
                    </div>
                    <div className="card-footer d-flex text-nowrap m-auto">
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          console.log('Viewing appointment'); // Debugging line
                          handleSubmit();
                        }}
                      >
                        View your appointment
                      </button>
                    </div>
                  </div>
                )}

                <div className="">
                  <select
                    className="form-select text-dark"
                    aria-label="Default select example"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)} // Handling event type selection
                  >
                    <option value="">Create Event</option>
                    <option value="Video Call">Video Call</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>
                <div className="mt-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)} // Handling time selection
                  >
                    <option value="">Select Time</option>
                    {/* Dynamically generate time slots based on meeting object */}
                    {Object.keys(meetings[0] || {}) // Assuming `meetings[0]` is the meeting data object you're using
                      .filter((key) => key.startsWith('slot')) // Filter to only get keys that start with 'slot'
                      .map((key, index) => (
                        <option key={index} value={meetings[0][key]}>
                          {meetings[0][key]}{' '}
                          {/* This will display the slot time */}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mt-2">
                  {/*
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={invitee}
                    onChange={(e) => setInvitee(e.target.value)} // Handling invitee selection
                  >
                    <option value="">Invitees</option>
                    <option className="text-dark" value="1">
                      Whole team
                    </option>
                  
                    {meetings.map((meeting) => (
                      <option
                        className="text-dark"
                        key={meeting._id}
                        value={meeting.recipient._id} 
                      >
                        {meeting.recipient.name}
                      </option>
                    ))}
                  </select>
                  */}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={invitee}
                    onChange={(e) => setInvitee(e.target.value)} // Handling invitee selection
                  >
                    <option value="">Invitees</option>
                    <option className="text-dark" value="1">
                      Whole team
                    </option>
                    {/* Map over employees instead of meetings */}
                    {employees.map((employee) => (
                      <option
                        className="text-dark"
                        key={employee._id} // Ensure each employee has a unique _id
                        value={employee._id}
                      >
                        {employee.name} {/* Display employee names */}
                      </option>
                    ))}
                  </select>
                </div>
                <form className="d-flex mt-2 w-100">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="dash-daterange"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)} // Handling subject input
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-md w-100"
                  onClick={handleSubmit}
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  Book Meeting on {selectedDate}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Button */}
      <button
        className="btn btn-sm"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Create Event
        <i className="m-1 fa-solid fa-calendar-plus"></i>
      </button>
    </div>
  );
}

{
  /*
import { useState } from 'react';
import { format } from 'date-fns';
import Calendar from './Calendar';
import axios from 'axios';

const today = format(new Date(), 'MM/dd/yyyy');

export default function CreateEvent({ meetings }) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [eventType, setEventType] = useState(''); // For selecting event type
  const [selectedTime, setSelectedTime] = useState(''); // For selecting time
  const [invitee, setInvitee] = useState(''); // For selecting invitee
  const [subject, setSubject] = useState(''); // For the subject
  const [showAlert, setShowAlert] = useState(false); // For alert
  const [alertMessage, setAlertMessage] = useState(''); // Alert message

  const handleDateSelection = (date) => {
    setSelectedDate(format(date, 'MM/dd/yyyy'));
    setShowDatePickerModal(false);
  };

  const handleSubmit = async () => {
    const newMeeting = {
      date: selectedDate,
      type: eventType,
      time: selectedTime,
      recipient: '66d7d2c380470662dbca3239', // This should be the ID of the invitee
      subject: subject,
      sender: '66d920a7274f0ef93f9dc3bd', // Set the correct sender ID
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/meetings',
        newMeeting
      );
      if (response.status === 200) {
        // Handle successful booking
        setEventType('');
        setSelectedTime('');
        setInvitee('');
        setSubject('');
        setAlertMessage('Meeting booked successfully!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Error booking meeting. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Choose a date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-md bg-transparent align-items-center w-100"
                  onClick={() => setShowDatePickerModal(true)}
                >
                  <Calendar onSelectDate={handleDateSelection} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDatePickerModal && (
        <div
          className="modal fade show"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                  Choose a Date
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDatePickerModal(false)}
                ></button>
              </div>
              <div className="modal-body w-100">
                {showAlert && (
                  <div
                    className="card mb-2"
                    style={{ maxWidth: '540px' }}
                    role="alert"
                  >
                    <div className="card-body">
                      <p className="fs-6">
                        {alertMessage} || {selectedDate}
                      </p>
                    </div>
                    <div className="card-footer d-flex text-nowrap m-auto">
                      <button className="btn btn-sm" onClick={handleSubmit}>
                        View your appointment
                      </button>
                    </div>
                  </div>
                )}

                <div className="">
                  <select
                    className="form-select text-dark"
                    aria-label="Default select example"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="">Create Meeting</option>
                    <option value="Video Call">Video Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mt-2">
                  {meetings.map((meeting) => (
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      key={meeting._id}
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Select Time</option>
                      {Array.from({ length: 7 }, (_, index) => (
                        <option
                          className="text-dark"
                          value={meeting[`slot${index + 1}`]}
                          key={index}
                        >
                          {meeting[`slot${index + 1}`]}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
                <div className="mt-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={invitee}
                    onChange={(e) => setInvitee(e.target.value)}
                  >
                    <option value="">Invitees</option>
                    <option className="text-dark" value="Whole team">
                      Whole team
                    </option>
                    {meetings.map((meeting) => (
                      <option
                        className="text-dark"
                        key={meeting._id}
                        value={meeting.recipient._id}
                      >
                        {meeting.recipient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control"
                    id="dash-daterange"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-md w-100"
                  onClick={handleSubmit}
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  Book Meeting on {selectedDate}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-sm"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Create Meeting
        <i className="m-1 fa-solid fa-calendar-plus"></i>
      </button>
    </div>
  );
}


 

*/
}
