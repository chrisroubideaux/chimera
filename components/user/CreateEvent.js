// Create event component
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import CalendarEvent from './CalendarEvent';
const today = format(new Date(), 'MM/dd/yyyy');

export default function CreateEvent({ meetings }) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [eventType, setEventType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [invitee, setInvitee] = useState('');
  const [subject, setSubject] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [employees, setEmployees] = useState('');

  const handleDateSelection = (date) => {
    setSelectedDate(format(date, 'MM/dd/yyyy'));
    setShowDatePickerModal(false);
  };

  const handleSubmit = async () => {
    const newMeeting = {
      senderId: '6755d87bd989d108bb273b59',
      senderModel: 'User',
      recipientIds: [invitee],
      recipientModel: 'Employee',
      isVideo: true,
      description: subject,
      times: '8:00AM-4:00PM',
      slot: selectedTime,
      days: [selectedDate],
    };

    try {
      const response = await axios.post(
        'https://chimera-h56c.onrender.com/meetings',
        newMeeting
      );
      if (response.status === 200) {
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
        const response = await axios.get(
          'https://chimera-h56c.onrender.com/employees'
        );
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

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
            <div className="modal-body w-100">
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-md bg-transparent align-items-center w-100"
                  onClick={() => setShowDatePickerModal(true)}
                >
                  <CalendarEvent onSelectDate={handleDateSelection} />
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
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{ maxWidth: '750px' }}
          >
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
                          console.log('Viewing appointment');
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
                    onChange={(e) => setEventType(e.target.value)}
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
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {/* Dynamically generate time slots based on meeting object */}
                    {Object.keys(meetings[0] || {})
                      .filter((key) => key.startsWith('slot'))
                      .map((key, index) => (
                        <option key={index} value={meetings[0][key]}>
                          {meetings[0][key]}{' '}
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
                    onChange={(e) => setInvitee(e.target.value)}
                  >
                    <option value="">Invitees</option>
                    <option className="text-dark" value="1">
                      Whole team
                    </option>
                    {/* Map over employees */}
                    {employees.map((employee) => (
                      <option
                        className="text-dark"
                        key={employee._id}
                        value={employee._id}
                      >
                        {employee.name}
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
                      onChange={(e) => setSubject(e.target.value)}
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
