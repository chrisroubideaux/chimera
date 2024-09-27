// Notifaction component
import { useState } from 'react';
import { format, isValid } from 'date-fns';

export default function Notifications({ meetings }) {
  // State to manage visible notifications
  const [visibleMeetings, setVisibleMeetings] = useState(meetings);

  // Helper function to format the date, defaulting to the current date if missing
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date(); // If dateString is falsy, use current date

    if (!isValid(date)) {
      console.error('Invalid date:', dateString); // Debugging line
      return 'Invalid Date'; // Return a placeholder if the date is invalid
    }

    return format(date, 'MM/dd/yyyy'); // Formats as MM/DD/YYYY
  };

  // Function to "delete" a notification by removing it from local state
  const deleteNotification = (meetingId) => {
    setVisibleMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== meetingId)
    );
  };

  // Function to delete all notifications
  const deleteAllNotifications = () => {
    setVisibleMeetings([]); // Clear all visible meetings
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
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  View
                </button>
              </h5>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                {visibleMeetings && visibleMeetings.length > 0 ? (
                  visibleMeetings.map((meeting) => (
                    <div className="accordion-body pb-1" key={meeting._id}>
                      <div className="meeting-container">
                        {/* Accessing the first date from the days array */}
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
                        {/* Delete button */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*

 // Notifaction component
import { useState } from 'react';
import { format, isValid } from 'date-fns';

export default function Notifications({ meetings }) {
  // State to manage visible notifications
  const [visibleMeetings, setVisibleMeetings] = useState(meetings);

  // Helper function to format the date, defaulting to the current date if missing
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date(); // If dateString is falsy, use current date

    if (!isValid(date)) {
      console.error('Invalid date:', dateString); // Debugging line
      return 'Invalid Date'; // Return a placeholder if the date is invalid
    }

    return format(date, 'MM/dd/yyyy'); // Formats as MM/DD/YYYY
  };

  // Function to "delete" a notification by removing it from local state
  const deleteNotification = (meetingId) => {
    setVisibleMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== meetingId)
    );
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100">
            <h5 className="d-flex fw-semi-bold">Notifications</h5>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h5 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    View
                  </button>
                </h5>
                <div
                  id="collapseOne"
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
                            <span>
                              {meeting.isVideo ? 'Video' : 'In-Person'}
                            </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


*/
}
