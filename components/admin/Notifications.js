// Notifaction component
import { format } from 'date-fns';

export default function Notifications({ meetings }) {
  // Helper function to format the date, defaulting to the current date if missing
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date(); // If dateString is falsy, use current date
    return format(date, 'MM/dd/yyyy'); // Formats as MM/DD/YYYY
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100">
            <h5 className="d-flex">Notifications</h5>

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
                    View Meetings
                  </button>
                </h5>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  {meetings && meetings.length > 0 ? (
                    meetings.map((meeting) => (
                      <div className="accordion-body pb-1" key={meeting._id}>
                        <div className="meeting-container">
                          {/* Format date using helper function */}
                          <div className="meeting-item">
                            <strong>Date:</strong>{' '}
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="meeting-item">
                            <strong>Meeting Type:</strong>{' '}
                            <span>
                              {meeting.isVideo ? 'Video' : 'In-Person'}
                            </span>
                          </div>
                          <div className="meeting-item">
                            <strong>Time:</strong> <span>{meeting.time}</span>
                          </div>
                          <div className="meeting-item">
                            <strong>Attendees:</strong>{' '}
                            <span>
                              {meeting.sender.name}, {meeting.recipient.name}
                            </span>
                          </div>
                          <div className="meeting-item">
                            <strong>Subject:</strong>{' '}
                            <span>{meeting.description}</span>
                          </div>
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

{
  /*
import { format } from 'date-fns';

export default function Notifications({ meetings }) {
  // Helper function to format the date, defaulting to the current date if missing
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date(); // If dateString is falsy, use current date
    return format(date, 'MM/dd/yyyy'); // Formats as MM/DD/YYYY
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100">
            <h5 className="d-flex">Notifications</h5>

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
                    View Meetings
                  </button>
                </h5>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  {meetings && meetings.length > 0 ? (
                    meetings.map((meeting) => (
                      <div className="accordion-body pb-1" key={meeting._id}>
                        <div>
                       
                          <h5>{formatDate(meeting.date)}</h5>
                          meeting type: <h5>{meeting.time}</h5>
                          <h5>{meeting.isVideo ? 'Video' : 'In-Person'}</h5>
                          Attendiess:{' '}
                          <p>
                            {meeting.sender.name} to {meeting.recipient.name}
                          </p>
                          Subject: <p>{meeting.description}</p>
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
