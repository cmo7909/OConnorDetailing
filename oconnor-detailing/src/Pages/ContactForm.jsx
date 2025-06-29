import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ initialDate, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    make: '',
    model: '',
    year: '',
    inquiry: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  // When initialDate changes, prefill the dates field
  useEffect(() => {
    if (initialDate) {
      setFormData(fd => ({ ...fd, dates: initialDate }));
    }
  }, [initialDate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        onSuccess && onSuccess(formData.dates);
        // Optionally close after a delay:
        // setTimeout(onClose, 2000);
      } else {
        const { message } = await res.json();
        setError(message || 'There was an issue sending your message.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Request a Detail for {formData.dates}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="dates"
            placeholder="Preferred Date"
            value={formData.dates}
            readOnly
          />

          <input
            type="text"
            name="make"
            placeholder="Vehicle Make"
            required
            value={formData.make}
            onChange={handleChange}
          />

          <input
            type="text"
            name="model"
            placeholder="Vehicle Model"
            required
            value={formData.model}
            onChange={handleChange}
          />

          <input
            type="text"
            name="year"
            placeholder="Vehicle Year"
            required
            value={formData.year}
            onChange={handleChange}
          />

          <textarea
            name="inquiry"
            placeholder="Additional Notes or Questions"
            rows="4"
            value={formData.inquiry}
            onChange={handleChange}
            style={{ resize: 'none', overflowY: 'auto', maxHeight: '150px' }}
          />

          <button type="submit">Send Inquiry</button>

          {success && <p className="success">Your message has been sent successfully!</p>}
          {error   && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
