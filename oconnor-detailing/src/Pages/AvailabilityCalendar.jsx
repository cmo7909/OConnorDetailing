import React, { useState } from 'react';
import './AvailabilityCalendar.css';

const unavailableDates = [
  '2025-06-29',
  '2025-06-30',
  '2025-07-01',
  '2025-07-02',
  '2025-07-03',
  '2025-07-04',
  '2025-07-05',
  '2025-07-08',
  
];

const AvailabilityCalendar = ({ onDateSelect, pendingDates = [] }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const dates = [];
  for (let i = 0; i < firstDayIndex; i++) dates.push(null);
  for (let d = 1; d <= daysInMonth; d++) dates.push(new Date(year, month, d));

  const handleMonthChange = offset => {
    const newDate = new Date(year, month + offset, 1);
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (newDate >= minDate && newDate <= maxDate) setViewDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header-bar">
        <button onClick={() => handleMonthChange(-1)} disabled={month === today.getMonth()}>&lt;</button>
        <h2>{viewDate.toLocaleString('default', { month: 'long' })} {year}</h2>
        <button onClick={() => handleMonthChange(1)} disabled={month === today.getMonth() + 1}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="calendar-header">{d}</div>)}
        {dates.map((date, i) => {
          if (!date) return <div key={i} className="calendar-cell empty"/>;
          const dateString = date.toISOString().split('T')[0];
          const isPast =
            date < new Date(new Date().setHours(0,0,0,0)) &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
            const isPending = pendingDates.includes(dateString);
          const isUnavailable = unavailableDates.includes(dateString);
          
          const state = isPast ? 'past' : isPending ? 'pending' : isUnavailable ? 'unavailable' : 'available';

          return (
            <div
              key={dateString}
              className={`calendar-cell ${state}`}
              style={{ cursor: state==='available' ? 'pointer' : 'default' }}
              onClick={() => {
                if (state === 'available' && typeof onDateSelect === 'function') {
                  onDateSelect(dateString);
                }
              }}
            >
              {date.getDate()}
              {!isPast && isUnavailable && <span className="x-mark">✖</span>}
            </div>
          );
        })}
      </div>
      {/* —— Legend —— */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color available" /> Available
        </div>
        <div className="legend-item">
          <span className="legend-color pending" /> Inquiry Pending
        </div>
        <div className="legend-item">
          <span className="legend-color unavailable" /> Booked / Busy
        </div>
        <div className="legend-item">
          <span className="legend-color past" /> Past Date 
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
