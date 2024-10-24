import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  getDay,
} from 'date-fns';

const Calendar = ({ onSelectDate, meetings = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const today = new Date();

  const eventTypes = {
    payroll: 'payroll',
    payday: 'payday',
    orders: 'orders',
    inventory: 'inventory',
    meeting: 'meeting',
  };

  // Generate recurring events
  const generateRecurringEvents = (currentMonth) => {
    let events = [];
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    let day = start;

    let isPayrollWeek = true;
    let isPaydayWeek = true;

    while (day <= end) {
      const dayOfWeek = getDay(day);

      // Orders (Tuesday and Thursday)
      if (dayOfWeek === 2 || dayOfWeek === 4) {
        events.push({
          date: format(day, 'yyyy-MM-dd'),
          type: eventTypes.orders,
          title: 'Orders',
        });
      }

      // Inventory (Sunday)
      if (dayOfWeek === 0) {
        events.push({
          date: format(day, 'yyyy-MM-dd'),
          type: eventTypes.inventory,
          title: 'Inventory',
        });
      }

      // Payroll every other Tuesday
      if (dayOfWeek === 3 && isPayrollWeek) {
        events.push({
          date: format(day, 'yyyy-MM-dd'),
          type: eventTypes.payroll,
          title: 'Payroll',
        });
        isPayrollWeek = false;
      } else if (dayOfWeek === 3 && !isPayrollWeek) {
        isPayrollWeek = true;
      }

      // Payday every other Friday
      if (dayOfWeek === 6 && isPaydayWeek) {
        events.push({
          date: format(day, 'yyyy-MM-dd'),
          type: eventTypes.payday,
          title: 'Payday',
        });
        isPaydayWeek = false;
      } else if (dayOfWeek === 6 && !isPaydayWeek) {
        isPaydayWeek = true;
      }

      day = addDays(day, 1);
    }

    return events;
  };

  const [recurringEvents, setRecurringEvents] = useState(
    generateRecurringEvents(currentDate)
  );

  useEffect(() => {
    setRecurringEvents(generateRecurringEvents(currentDate));
  }, [currentDate]);

  const formatMeetings = (meetings) => {
    if (!Array.isArray(meetings)) {
      return [];
    }

    return meetings.flatMap((meeting) => {
      const meetingDates = meeting.days
        .map((day) => {
          const parsedDate = new Date(day);
          return isNaN(parsedDate.getTime())
            ? null
            : format(parsedDate, 'yyyy-MM-dd');
        })
        .filter(Boolean); // Filter out any null values

      // Map valid dates to meeting objects
      return meetingDates.map((date) => ({
        date,
        type: eventTypes.meeting,
        title: (
          <div className="">
            Meeting: {meeting.sender.name} & {meeting.recipient.name}
          </div>
        ),
        slot: meeting.slot, // Add the slot information
        sender: meeting.sender.name,
        recipient: meeting.recipient.name,
      }));
    });
  };

  // Combine recurring events and meetings
  const combinedEvents = [...recurringEvents, ...formatMeetings(meetings)];

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header py-3">
        <button className="btn btn-sm" onClick={prevMonth}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>{format(currentDate, dateFormat)}</div>
        <button className="btn btn-sm" onClick={nextMonth}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="daysRow">
        {daysOfWeek.map((day, i) => (
          <div className="day container-fluid" key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        const eventsForDay = combinedEvents.filter((event) =>
          isSameDay(day, new Date(event.date))
        );

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : isSameDay(day, today)
                ? 'today'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay, eventsForDay)}
          >
            <span className="number">{formattedDate}</span>

            {eventsForDay.map((event, index) => (
              <div
                key={index}
                className={`event ${event.type}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day, events) => {
    setSelectedDate(day);
    setShowModal(true);

    setSelectedDayEvents(events);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  return (
    <div className="calendar">
      <div className="align-items-center">{renderHeader()}</div>
      {renderDays()}
      {renderCells()}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          id="exampleModalToggle"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: '750px' }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Events on {format(selectedDate, 'MMMM d, yyyy')}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body ">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event, index) => (
                    <div key={index} className={`box  ${event.type}`}>
                      <h6 className="py-3 fs-6 mt-2">{event.title}</h6>
                      {/* Render additional details in the modal */}
                      {event.type === eventTypes.meeting && (
                        <div className="fs-6">
                          <h6>
                            <strong>Time:</strong> {event.slot}
                          </h6>
                          <h6>
                            <strong>Sender:</strong> {event.sender}
                          </h6>
                          <h6>
                            <strong>Recipient:</strong> {event.recipient}
                          </h6>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No events for this day.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

/// calendar test
{
  /*
import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const today = new Date();

  
  const eventTypes = {
    payroll: 'payroll',
    payday: 'payday',
    inventory: 'inventory',
    orders: 'orders',
    meeting: 'meeting',
  };
// Generate recurring events
const generateRecurringEvents = (currentMonth) => {
  let events = [];
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  let day = start;

  let isPayrollWeek = true;
  let isPaydayWeek = true;

  while (day <= end) {
    const dayOfWeek = getDay(day);

    // Orders (Tuesday and Thursday)
    if (dayOfWeek === 2 || dayOfWeek === 4) {
      events.push({
        date: format(day, 'yyyy-MM-dd'),
        type: eventTypes.orders,
        title: 'Orders',
      });
    }

    // Inventory (Sunday)
    if (dayOfWeek === 0) {
      events.push({
        date: format(day, 'yyyy-MM-dd'),
        type: eventTypes.inventory,
        title: 'Inventory',
      });
    }

    // Payroll every other Tuesday
    if (dayOfWeek === 3 && isPayrollWeek) {
      events.push({
        date: format(day, 'yyyy-MM-dd'),
        type: eventTypes.payroll,
        title: 'Payroll',
      });
      isPayrollWeek = false;
    } else if (dayOfWeek === 3 && !isPayrollWeek) {
      isPayrollWeek = true;
    }

    // Payday every other Friday
    if (dayOfWeek === 6 && isPaydayWeek) {
      events.push({
        date: format(day, 'yyyy-MM-dd'),
        type: eventTypes.payday,
        title: 'Payday',
      });
      isPaydayWeek = false;
    } else if (dayOfWeek === 6 && !isPaydayWeek) {
      isPaydayWeek = true;
    }

    day = addDays(day, 1);
  }

  return events;
};

const [recurringEvents, setRecurringEvents] = useState(
  generateRecurringEvents(currentDate)
);

useEffect(() => {
  setRecurringEvents(generateRecurringEvents(currentDate));
}, [currentDate]);

const formatMeetings = (meetings) => {
  if (!Array.isArray(meetings)) {
    return [];
  }

  return meetings.flatMap((meeting) => {
    const meetingDates = meeting.days
      .map((day) => {
        const parsedDate = new Date(day);
        return isNaN(parsedDate.getTime())
          ? null
          : format(parsedDate, 'yyyy-MM-dd');
      })
      .filter(Boolean); // Filter out any null values

    // Map valid dates to meeting objects
    return meetingDates.map((date) => ({
      date,
      type: eventTypes.meeting,
      title: (
        <div className="">
          Meeting: {meeting.sender.name} & {meeting.recipient.name}
        </div>
      ),
      slot: meeting.slot, // Add the slot information
      sender: meeting.sender.name,
      recipient: meeting.recipient.name,
    }));
  });
};
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="">
        <div className="header py-3">
          <button className="btn btn-sm" onClick={() => prevMonth()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <span>{format(currentDate, dateFormat)}</span>
          </div>
          <button className="btn btn-sm" onClick={() => nextMonth()}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Abbreviated days of the week
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day container-fluid  " key={i}>
          {daysOfWeek[i]}
        </div>
      );
    }

    return (
      <div className="">
        <div className="daysRow">{days}</div>
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const event = events.find((event) =>
          isSameDay(day, parse(event.date, 'yyyy-MM-dd', new Date()))
        );
        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : isSameDay(day, today)
                ? 'today'
                : ''
            } ${event ? event.type : ''}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            {event && <span className="event">{event.title}</span>}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    const eventTitle = prompt('Enter event title');
    const eventType = prompt(
      'Enter event type (meeting, video-chat, reminder)'
    );
    if (eventTitle && eventType) {
      setEvents([
        ...events,
        { date: format(day, 'yyyy-MM-dd'), type: eventType, title: eventTitle },
      ]);
    }
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const prevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };
  

  return (
    <div className="">
      <div className="calendar mt-4">
       
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
*/
}
