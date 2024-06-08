// components/Calendar.js
import React, { useState, useEffect } from 'react';
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
      <div className="container">
        <div className="header">
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
  {
    /*
  const renderYearHeader = () => {
    const dateFormat = 'yyyy';

    return (
      <div className="conatainer">
        <div className="yearHeader">
          <button className="btn btn-sm" onClick={() => prevYear()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <span>{format(currentDate, dateFormat)}</span>
          </div>
          <button className="btn btn-sm" onClick={() => nextYear()}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  };
*/
  }

  const renderDays = () => {
    const dateFormat = 'EEEE';
    const days = [];

    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return (
      <div className="container">
        {' '}
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

  const renderToday = () => {
    const todayDateFormat = 'MM/dd/yyyy';
    return (
      <div className="todayDate">
        <span>{format(today, todayDateFormat)}</span>
      </div>
    );
  };

  return (
    <div className="">
      <div className="calendar">
        {/*
        {renderYearHeader()}
  */}
        {renderHeader()}

        {renderDays()}
        {renderCells()}
        {renderToday()}
      </div>
    </div>
  );
};

export default Calendar;
