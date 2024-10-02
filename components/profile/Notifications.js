// Notifaction component
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications() {
  // State to manage visible notifications for both meetings and time-off requests
  const [visibleMeetings, setVisibleMeetings] = useState([]);
  const [visibleRequests, setVisibleRequests] = useState([]);

  // Fetch meetings and time-off requests from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const meetingsResponse = await axios.get(
          'http://localhost:3001/meetings'
        );
        setVisibleMeetings(meetingsResponse.data);

        const timeOffResponse = await axios.get(
          'http://localhost:3001/timeOff'
        );
        setVisibleRequests(timeOffResponse.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Helper function to format the date, defaulting to the current date if missing
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    if (!isValid(date)) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    return format(date, 'MM/dd/yyyy');
  };

  // Function to "delete" a meeting by removing it from local state
  const deleteMeeting = (meetingId) => {
    setVisibleMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== meetingId)
    );
  };

  // Function to "delete" a request by removing it from local state
  const deleteRequest = (requestId) => {
    setVisibleRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== requestId)
    );
  };

  // Function to delete all notifications
  const deleteAllNotifications = () => {
    setVisibleMeetings([]);
    setVisibleRequests([]);
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
                {visibleMeetings.length > 0 ? (
                  visibleMeetings.map((meeting) => (
                    <div className="accordion-body pb-1" key={meeting._id}>
                      <div className="meeting-container">
                        <div className="meeting-item">
                          <strong>Date:</strong>
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
                          <strong>Meeting Type:</strong>
                          <span>{meeting.isVideo ? 'Video' : 'In-Person'}</span>
                        </div>
                        <div className="meeting-item">
                          <strong>Attendees:</strong>
                          <span>
                            {meeting.sender.name}, {meeting.recipient.name}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Subject:</strong>
                          <span>{meeting.description || 'No subject'}</span>
                        </div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => deleteMeeting(meeting._id)}
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

            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseRequests"
                  aria-expanded="false"
                  aria-controls="collapseRequests"
                >
                  Time-Off Requests
                </button>
              </h5>
              <div
                id="collapseRequests"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                {visibleRequests.length > 0 ? (
                  visibleRequests.map((request) => (
                    <div className="accordion-body pb-1" key={request._id}>
                      <div className="request-container">
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
                          className="btn btn-sm mt-2"
                          onClick={() => deleteRequest(request._id)}
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
