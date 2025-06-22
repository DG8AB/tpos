'use client'
import React, { useEffect, useState } from 'react';

export default function Creator() {
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState('');
  const [cssCustom, setCssCustom] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('c0user');
      if (!u) window.location.href = '/index.html';
    }
  }, []);

  function applyCustomCSS() {
    if (typeof window !== 'undefined' && cssCustom) {
      let styleTag = document.getElementById('user-css') as HTMLStyleElement | null;
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'user-css';
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = cssCustom;
    }
  }

  async function handleChat() {
    if (!userPrompt) return;
    setAiResult('Thinking...');
    setLoading(true);
    // Replace with your AI call
    setTimeout(() => {
      setAiResult(`(Fake AI response to: "${userPrompt}" — prompt: "${prompt || 'You are a helpful, creative assistant.'}")`);
      setLoading(false);
    }, 1000);
  }

  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('c0user');
      window.location.href = '/index.html';
    }
  }

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
        <h1>Create Your Own AI!</h1>
        <div className="section">
          <label htmlFor="ai-prompt">Give your AI a prompt/personality description:</label>
          <textarea
            id="ai-prompt"
            rows={3}
            placeholder="Describe how your AI should behave..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <label htmlFor="theme-select">Pick a CSS Theme:</label>
          <select
            id="theme-select"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="">Dark (default)</option>
            <option value="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/flatly/bootstrap.min.css">Flatly</option>
            <option value="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/solar/bootstrap.min.css">Solar</option>
            <option value="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/lux/bootstrap.min.css">Lux</option>
          </select>
          <span className="toggle small" onClick={() => {
            if (typeof window !== 'undefined')
              (document.getElementById('css-custom') as HTMLTextAreaElement).style.display = 'block';
          }}>Custom CSS</span>
          <textarea
            id="css-custom"
            style={{display: 'none'}}
            rows={3}
            placeholder="Paste your CSS here and click Apply below..."
            value={cssCustom}
            onChange={e => setCssCustom(e.target.value)}
          />
          <button type="button" onClick={applyCustomCSS}>Apply CSS</button>
        </div>
        <div className="section">
          <label htmlFor="user-prompt">Talk to your AI!</label>
          <textarea
            id="user-prompt"
            rows={2}
            placeholder="Say something to your AI..."
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
          />
          <button id="chat-btn" onClick={handleChat} disabled={loading}>
            {loading ? "Thinking..." : "Chat (model: dg8ab 8.9)"}
          </button>
          <div id="ai-result">{aiResult}</div>
        </div>
        <button style={{marginTop: '2em'}} onClick={logout}>Logout</button>
        <div className="small" style={{marginTop: '1em', opacity: 0.7}}>
          Model: <b>dg8ab 8.9</b> (our own)<br />Hosted on C.0
        </div>
      </div>
      <link rel="stylesheet" href="/neon.css" />
    </div>
  );
}