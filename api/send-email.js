// /api/send-email.js

const nodemailer = require('nodemailer');

function isProd() {
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ ok: false, message: 'Only POST requests allowed' });
    }

    const { name, email, phone, dates, make, model, year, inquiry } = req.body || {};
    if (!name || !email || !phone || !dates || !make || !model || !year) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' });
    }

    // --- ENV validation ---
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS; // app password (not your normal Gmail password)
    const EMAIL_TO   = process.env.EMAIL_TO;

    const missing = [];
    if (!EMAIL_USER) missing.push('EMAIL_USER');
    if (!EMAIL_PASS) missing.push('EMAIL_PASS');
    if (!EMAIL_TO)   missing.push('EMAIL_TO');

    if (missing.length) {
      return res.status(500).json({
        ok: false,
        message: `Missing environment variables: ${missing.join(', ')}`,
        hint: !isProd()
          ? 'Create .env.development.local at the project root with EMAIL_USER, EMAIL_PASS, EMAIL_TO (vercel dev loads it).'
          : 'Set these on your Vercel Project → Settings → Environment Variables.'
      });
    }

    // --- Transporter (Gmail SMTP) ---
    // Using host/port is a bit more reliable than { service: 'gmail' } on some systems.
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,          // 465 (secure) or 587 (STARTTLS)
      secure: true,       // true for 465, false for 587
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Helpful check in dev to catch auth issues early
    if (!isProd()) {
      try {
        await transporter.verify();
      } catch (err) {
        console.error('SMTP verify failed:', err);
        return res.status(500).json({
          ok: false,
          message: 'SMTP verification failed',
          error: err && err.message ? err.message : String(err),
          hint: 'If using Gmail, ensure 2FA is ON and use an App Password as EMAIL_PASS. The "from" must match EMAIL_USER.'
        });
      }
    }

    const html = `
      <h2>New Car Detailing Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Preferred Date(s):</strong> ${dates}</p>
      <p><strong>Vehicle:</strong> ${year} ${make} ${model}</p>
      ${inquiry ? `<p><strong>Additional Notes:</strong><br/>${inquiry}</p>` : ''}
    `;

    await transporter.sendMail({
      from: `"O'Connor Auto Detailing" <${EMAIL_USER}>`, // must be the authenticated user for Gmail
      to: EMAIL_TO,
      replyTo: email, // so you can reply to the customer directly
      subject: `New Detailing Inquiry from ${name}`,
      html,
    });

    return res.status(200).json({ ok: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('send-email error:', err);
    // Return a helpful error in dev so you can see what's wrong
    return res.status(500).json({
      ok: false,
      message: 'Failed to send email',
      error: !isProd() ? (err && err.message ? err.message : String(err)) : undefined
    });
  }
};

