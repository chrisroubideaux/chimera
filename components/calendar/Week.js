// Weekly component
import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  setHours,
  isSameDay,
} from 'date-fns';

const Week = ({ setActiveComponent, meetings }) => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weekStartDate = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEndDate = endOfWeek(currentWeek, { weekStartsOn: 0 });

  const renderCells = () => {
    const hours = Array.from({ length: 10 }, (_, index) => index + 7);

    const rows = hours.map((hour) => (
      <tr key={hour}>
        <td>{format(setHours(new Date(), hour), 'h a')}</td>
        {daysOfWeek.map((day, index) => (
          <td key={index}>
            <div className="cell">
              {renderMeetingDetails(addDays(currentWeek, index), hour)}
            </div>
          </td>
        ))}
      </tr>
    ));

    return rows;
  };

  const renderMeetingDetails = (day, hour) => {
    const meetingsForSlot = meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.days[0]);
      const [startTime] = meeting.slot.split('-').map((time) => time.trim());
      const meetingHour = parseInt(startTime);

      return meetingHour === hour && isSameDay(day, meetingDate);
    });

    return meetingsForSlot.length > 0
      ? meetingsForSlot.map((meeting, index) => {
          const [startTime, endTime] = meeting.slot
            .split('-')
            .map((time) => time.trim());
          const attendees = `${meeting.sender.name}, ${meeting.recipient.name}`;
          const timeRange = `${startTime} - ${endTime}`;

          return (
            <div key={index}>
              {/*
                <strong>{timeRange}</strong>
                <br />
                */}
              <span>
                <h6 className="fs-6">Attendies: {attendees} </h6>
              </span>
            </div>
          );
        })
      : null;
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3 align-items-center">
            <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
              <h5 className="fs-4 my-1">Week</h5>
              <p className="fw-bold">
                {format(weekStartDate, 'MMM d')} –{' '}
                {format(weekEndDate, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="col-md-6 text-end">
              <button
                className="btn btn-sm me-2"
                onClick={() =>
                  setCurrentWeek((prev) =>
                    startOfWeek(addDays(prev, -7), { weekStartsOn: 0 })
                  )
                }
              >
                Previous Week
              </button>
              <button
                className="btn btn-sm"
                onClick={() =>
                  setCurrentWeek((prev) =>
                    startOfWeek(addDays(prev, 7), { weekStartsOn: 0 })
                  )
                }
              >
                Next Week
              </button>
            </div>
          </div>
          <div className="container mt-3">
            <div className="table-responsive card">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    {daysOfWeek.map((day, index) => (
                      <th className="" key={index}>
                        {' '}
                        {day} {format(addDays(currentWeek, index), 'M/d')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{renderCells()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;
