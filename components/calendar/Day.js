// Calendar component for single day

import { useState, useEffect } from 'react';
import { format, isSameDay, addDays, subDays } from 'date-fns';

const Day = ({ setActiveComponent, meetings }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Calculate the maximum range for 3 days back and 3 days forward
  const threeDaysAgo = subDays(new Date(), 3);
  const threeDaysAhead = addDays(new Date(), 3);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('dayEvents')) || [];

    const formattedMeetings = meetings.map((meeting) => {
      const meetingDate = new Date(meeting.days[0]);
      const [startTime, endTime] = meeting.slot
        .split('-')
        .map((time) => time.trim());
      const hour = parseInt(startTime);

      return {
        date: meetingDate,
        hour: hour,
        attendees: `${meeting.sender.name}, ${meeting.recipient.name}`,
        type: meeting.isVideo ? 'Video' : 'Meeting',
        time: `${startTime} - ${endTime}`,
      };
    });

    const currentDayEvents = [
      ...storedEvents,
      ...formattedMeetings.filter((meeting) =>
        isSameDay(meeting.date, currentDay)
      ),
    ];

    setEvents(currentDayEvents);
  }, [currentDay, meetings]);

  const renderHeader = () => {
    const dateFormat = 'EEEE, MMM d yyyy';
    return (
      <div className="d-flex justify-content-between align-items-center">
        <h5>{format(currentDay, dateFormat)}</h5>
        <div>
          <button
            className="btn btn-sm me-2"
            onClick={() => toggleDay('prev')}
            disabled={isSameDay(currentDay, threeDaysAgo)}
          >
            Previous Day
          </button>

          <button
            className="btn btn-sm"
            onClick={() => toggleDay('next')}
            disabled={isSameDay(currentDay, threeDaysAhead)}
          >
            Next Day
          </button>
        </div>
      </div>
    );
  };

  const renderCells = () => {
    const hours = Array.from({ length: 11 }, (_, i) => 7 + i);

    return (
      <div className="body">
        {hours.map((hour) => {
          const event = events.find((event) => event.hour === hour);
          const formattedTime = format(new Date().setHours(hour), 'h a');

          return (
            <div key={hour} className="d-flex align-items-stretch mb-3">
              <div className="time-col">
                <span className="time">{formattedTime}</span>
              </div>
              <div className="cell">
                {event && (
                  <span className="">
                    <strong>Time:</strong> {event.time} <br />
                    <strong>Attendees:</strong> {event.attendees}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const toggleDay = (direction) => {
    if (direction === 'next') {
      setCurrentDay((prev) => addDays(prev, 1));
    } else if (direction === 'prev') {
      setCurrentDay((prev) => subDays(prev, 1));
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-12 mb-2 mb-md-0">{renderHeader()}</div>
          <div className="mt-3">{renderCells()}</div>
        </div>
      </div>
    </div>
  );
};

export default Day;
