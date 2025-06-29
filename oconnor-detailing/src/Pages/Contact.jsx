import React, { useState, useEffect } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import ContactForm         from './ContactForm';
import './Contact.css';

const ContactPage = () => {
  const [confirmDate,    setConfirmDate]    = useState(null);
  const [requestedDate,  setRequestedDate]  = useState(null);
  const [pendingDates,   setPendingDates]   = useState([]);
  const [bookedDates,    setBookedDates]    = useState([]);

  // fetch pendingDates if you’re loading them from an API or JSON
  useEffect(() => {
    fetch('/pendingDates.json')
      .then(r => r.json())
      .then(setPendingDates)
      .catch(console.error);
  }, []);

  // when calendar cell clicked
  const handleDateSelect = dateString => {
    setConfirmDate(dateString);
  };

  // user clicked “Yes” in our dialog
  const handleConfirmYes = () => {
    setRequestedDate(confirmDate);
    setConfirmDate(null);
  };

  // user clicked “No” or closed dialog
  const handleConfirmNo = () => {
    setConfirmDate(null);
  };

  const handleInquirySuccess = dateString => {
    setPendingDates(d => [...d, dateString]);
    setRequestedDate(null);
  };

  return (
    <div className="contact-page">
      <h1>Book Your Detail</h1>
      <p>Click an available date to request it.</p>

      <AvailabilityCalendar
        onDateSelect={handleDateSelect}
        pendingDates={pendingDates}
        unavailableDates={bookedDates}
      />

      {/* —— Custom Confirm Dialog —— */}
      {confirmDate && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>Do you want to request <strong>{confirmDate}</strong>?</p>
            <div className="confirm-buttons">
              <button onClick={handleConfirmYes}>Yes</button>
              <button onClick={handleConfirmNo}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* —— Contact Form Modal —— */}
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
