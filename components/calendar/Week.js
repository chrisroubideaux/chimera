// Weekly component for
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  parse,
  setHours,
} from 'date-fns';

const Week = ({ setActiveComponent }) => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('weekEvents'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('weekEvents', JSON.stringify(events));
  }, [events]);

  // Define days of the week statically or within the component
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate the start and end dates of the current week
  const weekStartDate = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEndDate = endOfWeek(currentWeek, { weekStartsOn: 0 });

  const renderCells = () => {
    const hours = Array.from({ length: 10 }, (_, index) => index + 7); // Hours from 7am to 5pm

    const rows = hours.map((hour) => (
      <tr key={hour}>
        <td>{format(setHours(new Date(), hour), 'h a')}</td>
        {daysOfWeek.map((day, index) => (
          <td key={index}>
            <div
              className="cell"
              onClick={() => onTimeSlotClick(addDays(currentWeek, index), hour)}
            >
              {renderEventTitle(addDays(currentWeek, index), hour)}
            </div>
          </td>
        ))}
      </tr>
    ));

    return rows;
  };

  const renderEventTitle = (day, hour) => {
    const event = events.find(
      (event) =>
        isSameDay(day, parse(event.date, 'yyyy-MM-dd', new Date())) &&
        event.hour === hour
    );

    return event ? (
      <span className={`event ${event.type}`}>{event.title}</span>
    ) : null;
  };

  const onTimeSlotClick = (day, hour) => {
    const eventTitle = prompt('Enter event title');
    const eventType = prompt(
      'Enter event type (meeting, video-chat, reminder)'
    );

    if (eventTitle && eventType) {
      setEvents([
        ...events,
        {
          date: format(day, 'yyyy-MM-dd'),
          hour,
          type: eventType,
          title: eventTitle,
        },
      ]);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5 className="fs-4 my-1">Week</h5>
              <p className="fw-bold">
                {format(weekStartDate, 'MMM d')} –{' '}
                {format(weekEndDate, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="container">
              <div className="table-responsive">
                <table className="table table-bordered ">
                  <thead className="">
                    <tr>
                      <th></th>
                      {daysOfWeek.map((day, index) => (
                        <th className="" key={index}>
                          {day} {format(addDays(currentWeek, index), 'M/d')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="">{renderCells()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;

{
  /*
export default function Week({ setActiveComponent }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h4 className="my-1">Week</h4>
            </div>
            <div className="col-md-6 col-xl-8">
              <div className="text-sm-end d-flex justify-content-end">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setActiveComponent('Month')}
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setActiveComponent('Week')}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setActiveComponent('Day')}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>
            <div className="container mt-5">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tues</th>
                      <th>Wed</th>
                      <th>Thurs</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7am</td>
                      <td></td>
                      <th></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
               
                  </tbody>
                </table>
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
