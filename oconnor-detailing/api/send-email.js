// api/send-email.js

console.log('ENV CHECK:', process.env.EMAIL, process.env.EMAIL_PASS, process.env.EMAIL_TO);

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, phone, dates, make, model, year, inquiry } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !dates || !make || !model || !year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Set up mail transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your mail provider
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Detailing Inquiry" <${process.env.EMAIL}>`,
      to: process.env.EMAIL_TO,
      subject: `New Detailing Inquiry from ${name}`,
      html: `
        <h2>New Car Detailing Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Date(s):</strong> ${dates}</p>
        <p><strong>Vehicle:</strong> ${year} ${make} ${model}</p>
        ${inquiry ? `<p><strong>Additional Notes:</strong><br/>${inquiry}</p>` : ''}
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email send error:', err.message, err.response);
    return res.status(500).json({ message: 'Failed to send email' });
  }
};
