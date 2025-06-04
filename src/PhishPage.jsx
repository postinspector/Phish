// src/PhishPage.jsx
import React, { useEffect } from 'react';

export default function PhishPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');

    if (uid) {
      fetch('https://your-backend-domain.com/log-phish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: uid, time: new Date().toISOString() }),
      });
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2em', backgroundColor: '#eaf4fc' }}>
      <img
        src="https://media1.tenor.com/m/_8Fm48kIrXQAAAAd/wahoo-fish.gif"
        alt="Rotating fish"
        style={{
          width: '500px',
        }}
      />
      <h1 style={{ color: '#d9534f' }}>You’ve just been <strong>phished</strong>!</h1>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
