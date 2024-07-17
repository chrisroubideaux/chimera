// Calendar component
// Calendar component
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

const Calendar = ({ setActiveComponent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const today = new Date();

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
  {
    /*
  const renderToday = () => {
    const todayDateFormat = 'MM/dd/yyyy';
    return (
      <div className="todayDate">
        <span>{format(today, todayDateFormat)}</span>
      </div>
    );
  };

*/
  }

  return (
    <div className="calendar">
      {/* 
        {renderToday()}
         */}
      <div className="row">
        <div className="col-md-6 col-xl-8">
          <div className="text-sm-end d-flex justify-content-end">
            <div className="btn-group" role="group" aria-label="Basic example">
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
      </div>
      <div className="align-items-center">{renderHeader()}</div>
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
