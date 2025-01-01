// Time off request component

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isValid, addDays, subDays, startOfDay } from 'date-fns';

export default function TimeOff() {
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));

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

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isValid(parsedDate)
      ? format(parsedDate, 'MM/dd/yyyy')
      : 'Invalid Date';
  };

  const nextDay = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const previousDay = () => {
    const newDate = subDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://chimera-h56c.onrender.com/timeoff/${id}`,
        {
          status,
        }
      );

      setTimeOffRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id
            ? { ...request, status: response.data.status }
            : request
        )
      );
    } catch (error) {
      console.error(`Error updating request ${id} status:`, error);
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
                    <h6 className="mb-0 mt-1 fw-bold d-flex px-1">
                      Time Off Requests
                      {format(currentDate, 'MM/dd/yyyy')}
                    </h6>

                    <div className="d-flex align-items-center">
                      <button onClick={previousDay} className="btn btn-sm me-2">
                        Previous Day
                      </button>
                      <button onClick={nextDay} className="btn btn-sm">
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
                                Name: {request.name || 'N/A'}
                              </h6>
                              <h6 className="fs-6 fw-bold">
                                Request Type: {request.requestType || 'N/A'}
                              </h6>
                              <h6 className="d-block fw-bold">
                                {formatDate(request.startDate)} -{' '}
                                {formatDate(request.endDate)}
                              </h6>
                              <div className="d-flex">
                                <button
                                  className="btn btn-sm me-2"
                                  onClick={() =>
                                    updateRequestStatus(request._id, 'Approved')
                                  }
                                  disabled={request.status === 'Approved'}
                                >
                                  {request.status === 'Approved'
                                    ? 'Approved'
                                    : 'Approve'}
                                </button>

                                <button
                                  className="btn btn-sm"
                                  onClick={() =>
                                    updateRequestStatus(request._id, 'Denied')
                                  }
                                  disabled={request.status === 'Denied'}
                                >
                                  {request.status === 'Denied'
                                    ? 'Denied'
                                    : 'Deny'}
                                </button>
                              </div>
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
