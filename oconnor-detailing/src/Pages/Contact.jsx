import React from 'react';
import './Contact.css';
import ContactForm from './ContactForm';
import AvailabilityCalendar from './AvailabilityCalendar';

const Contact = () => {
  return (
    <div className="booking-page">
      <h1>Book a Detail</h1>
      <p>Please check the calendar below to see when we're available! (Avalibility may vary each "free" day)</p>
      <AvailabilityCalendar />
      <div className="contact-page">
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
      <p style={{ textAlign: 'center' }}>
        Please check our calendar above for availability, then fill out the form below to request a detail.
      </p>
      <ContactForm />
    </div>
    </div>
  );
};

export default Contact;