import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, number, inquiry, dates, partySize } = req.body;

    // Debug: Check if environment variables are loaded
    console.log('Sending from:', process.env.EMAIL);
    console.log('Sending to:', email);

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,  // Ensure it's the sender email
      to: process.env.EMAIL, // Your desired receiving email
      subject: `TheDuke inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone number: ${number}\nDate: ${dates}\nParty Size: ${partySize}\nInquiry: ${inquiry}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Log error details
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}