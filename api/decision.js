// api/decision.js
const redis = require('./_redis');

const ADMIN_KEY = process.env.ADMIN_KEY || process.env.VITE_ADMIN_KEY || process.env.REACT_APP_ADMIN_KEY;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST' });

  // simple auth
  const key = req.headers['x-admin-key'];
  if (!ADMIN_KEY || key !== ADMIN_KEY) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const { date, action } = req.body || {};
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Valid date (YYYY-MM-DD) required' });
    }
    if (!action) return res.status(400).json({ message: 'action required' });

    const month = date.slice(0, 7);
    const pendingKey = `pending:${month}`;
    const bookedKey  = `booked:${month}`;

    switch (action) {
      case 'approve': {
        // move pending -> booked
        await redis.srem(pendingKey, date);
        await redis.sadd(bookedKey, date);
        break;
      }
      case 'deny': {
        // remove from pending
        await redis.srem(pendingKey, date);
        break;
      }
      case 'block': {
        // force add to booked, remove from pending if there
        await redis.srem(pendingKey, date);
        await redis.sadd(bookedKey, date);
        break;
      }
      case 'unblock': {
        // remove from booked
        await redis.srem(bookedKey, date);
        break;
      }
      default:
        return res.status(400).json({ message: 'Unknown action' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('decision error:', err);
    return res.status(500).json({ message: 'server error' });
  }
};
