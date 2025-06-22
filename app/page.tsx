'use client'
import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('c0user')) {
      window.location.href = '/creator.html';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    if (!name || name.length < 2) {
      setMsg('Enter your full name.');
      return;
    }
    if (!/^[0-9]{10,15}$/.test(number.replace(/\D/g, ''))) {
      setMsg('Invalid phone number.');
      return;
    }
    setLoading(true);
    const user = { name, number: number.replace(/\D/g, '') };
    localStorage.setItem('c0user', JSON.stringify(user));
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (data.success) {
        setMsg('');
        window.location.href = '/creator.html';
      } else {
        setMsg(data.error || 'Signup failed.');
      }
    } catch (err) {
      setMsg('Network issue. Try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="logo-corner">
        <svg viewBox="0 0 220 64" fill="none">
          <circle cx="25" cy="32" r="22" fill="#1e90ff" stroke="#fff" strokeWidth="3"/>
          <text x="16" y="44" fontSize="27" fontFamily="monospace" fontWeight="bold" fill="#fff">C</text>
          <circle cx="55" cy="32" r="22" fill="#222e38" stroke="#1e90ff" strokeWidth="3"/>
          <text x="49" y="44" fontSize="27" fontFamily="monospace" fontWeight="bold" fill="#1e90ff">.</text>
          <rect x="75" y="16" width="124" height="32" rx="10" fill="#222e38" stroke="#1e90ff" strokeWidth="2"/>
          <text x="88" y="39" fontSize="20" fontFamily="monospace" fill="#fff" fontWeight="bold" letterSpacing="2">
            AI Competition
          </text>
        </svg>
        <div className="socials">
          <a href="https://youtube.com/@dg8ab" target="_blank" rel="noopener">
            <span style={{fontSize: "1.2em", verticalAlign: "middle"}}>📺</span> Youtube
          </a>
        </div>
        <div className="dg8ab-name">by DG8AB</div>
      </div>
      <div className="container">
        <h1>C.0 AI Competition</h1>
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              maxLength={40}
              autoComplete="off"
              placeholder="eg. Alex"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="number">Phone Number</label>
            <input
              type="tel"
              id="number"
              required
              maxLength={20}
              autoComplete="off"
              placeholder="eg. 15551234567"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Sign up & Create your AI'}</button>
        </form>
        <div id="signup-msg">{msg}</div>
      </div>
      <link rel="stylesheet" href="/neon.css" />
    </div>
  );
}