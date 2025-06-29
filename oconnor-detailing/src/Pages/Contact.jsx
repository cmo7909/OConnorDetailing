import React, { useState, useEffect } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import ContactForm         from './ContactForm';
import './ContactPage.css';

const ContactPage = () => {
  const [requestedDate, setRequestedDate] = useState(null);
  const [pendingDates,  setPendingDates]  = useState([]);
  const [bookedDates,   setBookedDates]   = useState([]);

  // on mount, grab pendingDates.json
  useEffect(() => {
    fetch('/pendingDates.json')
      .then(res => res.json())
      .then(setPendingDates)
      .catch(console.error);
  }, []);

  const handleDateSelect = dateString => {
    if (window.confirm(`Request a detail for ${dateString}?`)) {
      setRequestedDate(dateString);
    }
  };

  const handleInquirySuccess = dateString => {
    // optionally show a “thanks” message, but we don’t modify pendingDates here
    setRequestedDate(null);
    alert('Inquiry sent! I will confirm shortly.');
  };

  return (
    <div className="contact-page">
      <h1>Book Your Detail</h1>
      <p>Click a green date to request it.</p>

      <AvailabilityCalendar
        onDateSelect={handleDateSelect}
        pendingDates={pendingDates}
        unavailableDates={bookedDates}
      />

      {requestedDate && (
        <ContactForm
          initialDate={requestedDate}
          onClose={() => setRequestedDate(null)}
          onSuccess={handleInquirySuccess}
        />
      )}
    </div>
  );
};

export default ContactPage;
