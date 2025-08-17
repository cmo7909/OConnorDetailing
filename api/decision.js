// Admin “approve/deny” a pending date.
// Approve: moves date from pending to booked.
// Deny: removes date from pending.
const redis = require('./_redis');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST' });

  try {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const { date, action } = req.body || {};
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Valid date (YYYY-MM-DD) required' });
    }
    if (!['approve', 'deny'].includes(action)) {
      return res.status(400).json({ message: 'action must be approve|deny' });
    }

    const month = date.slice(0, 7);
    const pendingKey = `pending:${month}`;
    const bookedKey = `booked:${month}`;

    if (action === 'approve') {
      await Promise.all([
        redis.srem(pendingKey, date),
        redis.sadd(bookedKey, date),
      ]);
    } else {
      await redis.srem(pendingKey, date);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('decision error:', err);
    return res.status(500).json({ message: 'server error' });
  }
};

