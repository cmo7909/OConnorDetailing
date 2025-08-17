import React, { useState } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import ContactForm from './ContactForm';
import './Contact.css';

const ContactPage = () => {
  const [confirmDate, setConfirmDate] = useState(null);
  const [requestedDate, setRequestedDate] = useState(null);
  const [pendingDates, setPendingDates] = useState([]); // optimistic only

  // user clicked a green/available day
  const handleDateSelect = (dateString) => {
    setConfirmDate(dateString);
  };

  // confirm dialog: Yes
  const handleConfirmYes = () => {
    setRequestedDate(confirmDate);
    setConfirmDate(null);
  };

  // confirm dialog: No / close
  const handleConfirmNo = () => {
    setConfirmDate(null);
  };

  // called by ContactForm AFTER /api/send-email returns 200
  // (server marks the date pending in Redis; we optimistically add it too)
  const handleInquirySuccess = (dateString) => {
    setPendingDates((prev) =>
      prev.includes(dateString) ? prev : [...prev, dateString]
    );
    setRequestedDate(null);
  };

  return (
    <div className="contact-page">
      <h1>Book Your Detail</h1>
      <p>Click an available date to request it.</p>

      <AvailabilityCalendar
        onDateSelect={handleDateSelect}
        pendingDates={pendingDates} // merged with server data inside the component
      />

      {/* —— Custom Confirm Dialog —— */}
      {confirmDate && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>
              Do you want to request <strong>{confirmDate}</strong>?
            </p>
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
