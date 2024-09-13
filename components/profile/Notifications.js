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
export default function Notifications() {
  return (
    <div className="mt-3 card">
      <div className="chat-container ">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100">
            <h5 className=" d-flex ">Notifactions</h5>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h5 className="accordion-header">
                  <button
                    className="accordion-button fw-bold "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    View Messages
                  </button>
                </h5>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body pb-1">
                    <strong>Meeting details...</strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Meeting Subject date
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>Meeting details...</strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Meeting Subject date
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>Meeting details...</strong>
                  </div>
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
