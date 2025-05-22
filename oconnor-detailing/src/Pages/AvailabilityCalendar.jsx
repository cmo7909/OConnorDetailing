import React, { useState } from 'react';
import './AvailabilityCalendar.css';

const unavailableDates = [
  '2025-05-23',
  '2025-05-24',
  '2025-05-25',
  '2025-05-26',
];

const AvailabilityCalendar = () => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const dates = [];

  for (let i = 0; i < firstDayIndex; i++) {
    dates.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }

  const handleMonthChange = (offset) => {
  const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 1); // next month only
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);     // this month

  if (newDate >= minDate && newDate <= maxDate) {
    setViewDate(newDate);
  }
};

  return (
    <div className="calendar-container">
      <div className="calendar-header-bar">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>
          {viewDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div className="calendar-header" key={d}>{d}</div>
        ))}
        {dates.map((date, index) => {
          if (!date) return <div className="calendar-cell" key={index} />;

          const dateString = date.toISOString().split('T')[0];
          const isUnavailable = unavailableDates.includes(dateString);
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0)) && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

          return (
            <div
              key={dateString}
              className={`calendar-cell ${isPast ? 'past' : isUnavailable ? 'unavailable' : 'available'}`}
            >
              {date.getDate()}
              {!isPast && isUnavailable && <span className="x-mark">✖</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
