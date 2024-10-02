// Time off request component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { format, isValid, addDays, subDays, startOfDay } from 'date-fns';

export default function TimeOff({ setActiveComponent }) {
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date())); // Initialize to today's date without time

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/timeoff');
        setTimeOffRequests(response.data);
      } catch (error) {
        console.error('Error fetching time-off requests:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);

  // Function to format the current date using date-fns
  const formatCurrentDate = () => {
    return format(currentDate, 'MM/dd/yyyy');
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isValid(parsedDate)
      ? format(parsedDate, 'MM/dd/yyyy')
      : 'Invalid Date';
  };

  // Function to navigate to the next day
  const nextDay = () => {
    const newDate = addDays(currentDate, 1);
    if (newDate <= addDays(startOfDay(new Date()), 7)) {
      setCurrentDate(newDate);
    }
  };

  // Function to navigate to the previous day
  const previousDay = () => {
    const newDate = subDays(currentDate, 1);
    // Check if newDate is not in the past
    if (newDate >= startOfDay(new Date())) {
      setCurrentDate(newDate);
    }
  };

  return (
    <div>
      <div className="mt-3">
        <div className="chat-container">
          <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
            <div className="card-body h-100">
              <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
                <div
                  className="fade tab-pane show active h-100"
                  id="chat-1"
                  role="tabpanel"
                  aria-labelledby="chat-1-tab"
                >
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex mb-2 mb-sm-0">
                      <div className="flex-shrink-0 avatar me-2">
                        <img
                          className="avatar-img rounded-circle"
                          src="assets/images/avatar/10.jpg"
                          alt=""
                        />
                      </div>
                      <div className="d-block flex-grow-1">
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1">
                          Time Off Request: {formatCurrentDate()}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={previousDay}
                        disabled={currentDate < startOfDay(new Date())}
                        className="btn btn-sm me-2"
                      >
                        Previous Day
                      </button>
                      <button
                        onClick={nextDay}
                        disabled={
                          currentDate >= addDays(startOfDay(new Date()), 7)
                        }
                        className="btn btn-sm"
                      >
                        Next Day
                      </button>
                    </div>
                  </div>
                  <hr />

                  {timeOffRequests.length > 0 ? (
                    timeOffRequests.map((request) => (
                      <div key={request._id}>
                        <div className="list-group" style={{ width: '50rem' }}>
                          <label className="list-group-item d-flex gap-3">
                            <span className="pt-1 form-checked-content">
                              <h6 className="fs-6 fw-bold">
                                <i className="social-icon fa-solid fa-person me-1"></i>
                                Name: {request.name || 'N/A'}
                              </h6>
                              <h6 className="fs-6 fw-bold">
                                <i className="social-icon fa-solid fa-book me-1"></i>
                                Request Type: {request.requestType || 'N/A'}
                              </h6>
                              <h6 className="d-block fw-bold">
                                <i className="social-icon fa-solid fa-calendar-days me-1"></i>
                                {formatDate(request.startDate)} -{' '}
                                {formatDate(request.endDate)}
                              </h6>
                            </span>
                          </label>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No time-off requests available</p>
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
