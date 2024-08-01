// Calendar component for single day

import React, { useState, useEffect } from 'react';
import { format, parse, setHours, isSameDay } from 'date-fns';

const Day = ({ setActiveComponent }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('dayEvents'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('dayEvents', JSON.stringify(events));
  }, [events]);

  const renderHeader = () => {
    const dateFormat = 'EEEE, MMM d yyyy';
    return (
      <div className="col col-center">{format(currentDay, dateFormat)}</div>
    );
  };

  const renderCells = () => {
    const hours = [];
    for (let hour = 7; hour <= 17; hour++) {
      // Adjusted time range from 7am to 5pm
      hours.push(hour);
    }

    return (
      <div className="body">
        {hours.map((hour) => {
          const event = events.find(
            (event) =>
              isSameDay(
                currentDay,
                parse(event.date, 'yyyy-MM-dd', new Date())
              ) && event.hour === hour
          );

          const formattedTime = format(setHours(new Date(), hour), 'h a');

          return (
            <div key={hour} className="d-flex align-items-stretch mb-3">
              <div className="time-col">
                <span className="time">{formattedTime}</span>
              </div>
              <div
                className={`cell ${event ? event.type : ''}`}
                onClick={() => onTimeSlotClick(hour)}
              >
                {event && <span className="event">{event.title}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const onTimeSlotClick = (hour) => {
    const eventTitle = prompt('Enter event title');
    const eventType = prompt(
      'Enter event type (meeting, video-chat, reminder)'
    );
    if (eventTitle && eventType) {
      setEvents([
        ...events,
        {
          date: format(currentDay, 'yyyy-MM-dd'),
          hour,
          type: eventType,
          title: eventTitle,
        },
      ]);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
            <h5 className="text-center">{renderHeader()}</h5>
          </div>

          <div className="mt-3">{renderCells()}</div>
        </div>
      </div>
    </div>
  );
};

export default Day;
