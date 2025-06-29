// ContactPage.jsx
import React, { useState } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import ContactForm from './ContactForm';
import './Contact.css';

const Contact = () => {
  const [requestedDate, setRequestedDate] = useState(null);
  const [pendingDates, setPendingDates] = useState([]);

  const handleDateSelect = dateString => {
    if (window.confirm(`Request ${dateString}?`)) {
      setRequestedDate(dateString);
    }
  };

  const handleInquirySuccess = dateString => {
    setPendingDates(d => [...d, dateString]);
    setRequestedDate(null);
  };

  return (
    <div className="contact-page">
      <h1>Book Your Detail</h1>
      <p>Click a green date to request it.</p>
      <AvailabilityCalendar
       onDateSelect={handleDateSelect}
       pendingDates={pendingDates}
     />


      {requestedDate && (
        <ContactForm
          initialDate={requestedDate}
          onClose={() => setRequestedDate(null)}
        />
      )}

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

export default Contact;
