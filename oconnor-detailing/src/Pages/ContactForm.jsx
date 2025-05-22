import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
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
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          dates: '',
          make: '',
          model: '',
          year: '',
          inquiry: '',
        });
      } else {
        console.error('Email failed:', response.statusText);
        setError('There was an issue sending your message. Please try again.');
        setSuccess(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please check your connection and try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Send an Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
        <input type="text" name="year" placeholder="Vehicle Year" required value={formData.year} onChange={handleChange} />
        <input type="text" name="make" placeholder="Vehicle Make" required value={formData.make} onChange={handleChange} />
        <input type="text" name="model" placeholder="Vehicle Model" required value={formData.model} onChange={handleChange} />
        <input type="text" name="dates" placeholder="Preferred Date(s)" required value={formData.dates} onChange={handleChange} />
        <textarea name="inquiry" placeholder="Additional Notes or Questions" rows="3" value={formData.inquiry} onChange={handleChange} style={{resize: 'none', overflowY: 'auto', maxHeight: '150px',
  }}
/>

        <button type="submit">Send Inquiry</button>
        {success && <p className="success">Your message has been sent successfully!</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
