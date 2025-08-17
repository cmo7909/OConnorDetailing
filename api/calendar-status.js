// api/calendar-status.js
const redis = require('./_redis');

module.exports = async (req, res) => {
  try {
    // Be resilient: some dev setups don't populate req.query.
    let month =
      (req.query && req.query.month) ||
      (() => {
        try {
          const url = new URL(req.url, 'http://local'); // base is ignored
          return url.searchParams.get('month');
        } catch {
          return '';
        }
      })() ||
      '';

    month = String(month).slice(0, 7);

    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'month=YYYY-MM required' });
    }

    const [pendingRaw, bookedRaw] = await Promise.all([
      redis.smembers(`pending:${month}`),
      redis.smembers(`booked:${month}`),
    ]);

    const bookedSet = new Set(Array.isArray(bookedRaw) ? bookedRaw : []);
    const pendingOnly = (Array.isArray(pendingRaw) ? pendingRaw : []).filter(
      (d) => !bookedSet.has(d)
    );

    // Keep things tidy & predictable for the frontend
    pendingOnly.sort();
    const booked = Array.from(bookedSet).sort();

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      month,
      pending: pendingOnly,
      booked,
      counts: { pending: pendingOnly.length, booked: booked.length },
    });
  } catch (err) {
    console.error('calendar-status error:', err);
    return res.status(500).json({ message: 'server error' });
  }
};


