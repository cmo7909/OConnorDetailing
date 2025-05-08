import React from 'react';
import './Contact.css';
import AvailabilityCalendar from './AvailabilityCalendar';

const Contact = () => {
  return (
    <div className="booking-page">
      <h1>Book a Detail</h1>
      <p>Please check the calendar below to see when we're available!</p>
      <AvailabilityCalendar />
      {/* Below this you can include your contact form / email function */}
    </div>
  );
};

export default Contact;