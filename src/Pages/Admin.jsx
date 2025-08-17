import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7)); // YYYY-MM
  const [pending, setPending] = useState([]);

  async function load() {
    const r = await fetch(`/api/calendar-status?month=${month}`);
    const j = await r.json(); setPending(j.pending || []);
  }
  useEffect(() => { load(); }, [month]);

  async function decide(date, action) {
    await fetch('/api/decision', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'x-admin-key': process.env.REACT_APP_ADMIN_KEY
      },
      body: JSON.stringify({ date, action }),
    });
    load();
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin – Pending Dates</h1>
      <input type="month" value={month} onChange={e=>setMonth(e.target.value)} />
      <ul>
        {pending.map(d => (
          <li key={d} style={{margin:'8px 0'}}>
            {d}
            <button onClick={()=>decide(d,'approve')} style={{marginLeft:8}}>Approve</button>
            <button onClick={()=>decide(d,'deny')} style={{marginLeft:8}}>Deny</button>
          </li>
        ))}
        {pending.length===0 && <p>No pending dates.</p>}
      </ul>
    </div>
  );
}

