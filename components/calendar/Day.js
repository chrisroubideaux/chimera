// Calendar component for single day
import { useState, useEffect } from 'react';
import { format, parse, setHours, isSameDay, addDays, subDays } from 'date-fns';

const Day = ({ setActiveComponent, meetings }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]);

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
            disabled={isSameDay(currentDay, new Date())}
          >
            Previous Day
          </button>
          <button
            className="btn btn-sm"
            onClick={() => toggleDay('next')}
            disabled={isSameDay(currentDay, addDays(new Date(), 5))}
          >
            Next Day
          </button>
        </div>
      </div>
    );
  };

  const renderCells = () => {
    const hours = Array.from({ length: 11 }, (_, i) => 7 + i); // Create hours from 7am to 5pm

    return (
      <div className="body">
        {hours.map((hour) => {
          const event = events.find((event) => event.hour === hour);
          const formattedTime = format(setHours(new Date(), hour), 'h a');

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

{
  /*
  import { useState, useEffect } from 'react';
import {
  format,
  parse,
  setHours,
  isSameDay,
  addDays,
  subDays,
  differenceInCalendarDays,
} from 'date-fns';
import axios from 'axios';

const Day = ({ setActiveComponent, meetings }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]); // State to hold meetings from API
  const maxDaysAhead = 5; // Maximum of five days ahead of the current date

  // Fetch meetings from the API when component mounts
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('//meetings'); // Replace with your API endpoint
        const meetings = response.data;
        setEvents(meetings); // Set meetings data into state
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  // Function to move to the next day (limited to 5 days ahead)
  const goToNextDay = () => {
    if (
      differenceInCalendarDays(addDays(currentDay, 1), new Date()) <=
      maxDaysAhead
    ) {
      setCurrentDay(addDays(currentDay, 1));
    }
  };

  // Function to move to the previous day (cannot go back before today)
  const goToPreviousDay = () => {
    if (differenceInCalendarDays(currentDay, new Date()) > 0) {
      setCurrentDay(subDays(currentDay, 1));
    }
  };

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
          // Find the event (meeting) for the current hour
          const event = events.find(
            (event) =>
              isSameDay(
                currentDay,
                parse(event.date, 'yyyy-MM-dd', new Date())
              ) && new Date(event.slot).getHours() === hour // Ensure the event hour matches the slot
          );

          const formattedTime = format(setHours(new Date(), hour), 'h a');

          return (
            <div key={hour} className="d-flex align-items-stretch mb-3">
              <div className="time-col">
                <span className="time">{formattedTime}</span>
              </div>
              <div className={`cell ${event ? event.type : ''}`}>
               
                {event ? (
                  <div className="event">
                    <strong>{event.title}</strong>
                    <br />
                    <small>
                      Attendees: {event.sender.name}, {event.recipient.name}
                    </small>
                  </div>
                ) : (
                  <span className="empty-slot">No Event</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6 col-xl-4 mb-2 mb-md-0">
            <h5 className="text-center">{renderHeader()}</h5>
          </div>

        
          <div className="col-md-6 col-xl-8 d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={goToPreviousDay}
              disabled={differenceInCalendarDays(currentDay, new Date()) === 0}
            >
              Previous Day
            </button>
            <button
              className="btn btn-secondary"
              onClick={goToNextDay}
              disabled={
                differenceInCalendarDays(currentDay, new Date()) ===
                maxDaysAhead
              }
            >
              Next Day
            </button>
          </div>
        </div>

       
        <div className="mt-3">{renderCells()}</div>
      </div>
    </div>
  );
};

export default Day;

*/
}
