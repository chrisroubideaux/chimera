// Notifaction component
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications({ meetings }) {
  const [visibleMeetings, setVisibleMeetings] = useState(meetings);
  const [timeOffRequests, setTimeOffRequests] = useState([]);

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    if (!isValid(date)) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    return format(date, 'MM/dd/yyyy');
  };

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get(
          'https://chimera-h56c.onrender.com/timeoff'
        );
        setTimeOffRequests(response.data);
      } catch (error) {
        console.error('Error fetching time-off requests:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);

  const deleteNotification = (meetingId) => {
    setVisibleMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== meetingId)
    );
  };

  const deleteTimeOffRequest = (requestId) => {
    setTimeOffRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== requestId)
    );
  };

  const deleteAllNotifications = () => {
    setVisibleMeetings([]);
    setTimeOffRequests([]);
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100 d-flex justify-content-between align-items-center">
            <h5 className="d-flex fw-semi-bold">Notifications</h5>
            <button className="btn btn-sm" onClick={deleteAllNotifications}>
              Delete All
            </button>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMeetings"
                  aria-expanded="true"
                  aria-controls="collapseMeetings"
                >
                  Meetings
                </button>
              </h5>
              <div
                id="collapseMeetings"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                {visibleMeetings && visibleMeetings.length > 0 ? (
                  visibleMeetings.map((meeting) => (
                    <div className="accordion-body pb-1" key={meeting._id}>
                      <div className="meeting-container">
                        <div className="meeting-item">
                          <strong>Date:</strong>{' '}
                          <span>
                            {meeting.days.length > 0
                              ? formatDate(meeting.days[0])
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Time:</strong> <span>{meeting.slot}</span>
                        </div>
                        <div className="meeting-item">
                          <strong>Meeting Type:</strong>{' '}
                          <span>{meeting.isVideo ? 'Video' : 'In-Person'}</span>
                        </div>
                        <div className="meeting-item">
                          <strong>Attendees:</strong>{' '}
                          <span>
                            {meeting.sender.name}, {meeting.recipient.name}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Subject:</strong>{' '}
                          <span>{meeting.description || 'No subject'}</span>
                        </div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => deleteNotification(meeting._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No meetings available</div>
                )}
              </div>
            </div>

            {/* Time-Off Requests Section */}

            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTimeOff"
                  aria-expanded="true"
                  aria-controls="collapseTimeOff"
                >
                  Time-Off Requests
                </button>
              </h5>
              <div
                id="collapseTimeOff"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                {timeOffRequests && timeOffRequests.length > 0 ? (
                  timeOffRequests.map((request) => (
                    <div className="accordion-body pb-1" key={request._id}>
                      <div className="request-container">
                        <div className="request-item">
                          <strong>Employee:</strong>{' '}
                          <span>{request.employee?.name || 'N/A'}</span>
                        </div>
                        <div className="request-item">
                          <strong>Date:</strong>{' '}
                          <span>{formatDate(request.date)}</span>
                        </div>
                        <div className="request-item">
                          <strong>Request Type:</strong>{' '}
                          <span>{request.requestType}</span>
                        </div>
                        <div className="request-item">
                          <strong>Start Date:</strong>{' '}
                          <span>{formatDate(request.startDate)}</span>
                        </div>
                        <div className="request-item">
                          <strong>End Date:</strong>{' '}
                          <span>{formatDate(request.endDate)}</span>
                        </div>
                        <div className="request-item">
                          <strong>Status:</strong> <span>{request.status}</span>
                        </div>

                        <button
                          className="btn btn-sm mt-2 me-2"
                          onClick={() => deleteTimeOffRequest(request._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No time-off requests available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
