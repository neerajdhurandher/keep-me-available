'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles/home.css';

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const router = useRouter();

  const handleStart = () => {
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes > 0) {
      router.push(`/active?duration=${totalMinutes}`);
    }
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <header className="header">
          <h1 className="title">Keep Me Available</h1>
          <p className="subtitle">
            Stay active and prevent your system from going to sleep
          </p>
        </header>

        <main className="main-content">
          <div className="timer-card">
            <h2 className="card-title">Set Your Active Duration</h2>
            
            <div className="timer-inputs">
              <div className="input-group">
                <label htmlFor="hours" className="input-label">Hours</label>
                <input
                  id="hours"
                  type="number"
                  min="0"
                  max="12"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className="time-input"
                />
              </div>
              
              <div className="input-separator">:</div>
              
              <div className="input-group">
                <label htmlFor="minutes" className="input-label">Minutes</label>
                <input
                  id="minutes"
                  type="number"
                  min="1"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="time-input"
                />
              </div>
            </div>

            <div className="duration-display">
              Total: {hours > 0 && `${hours}h `}{minutes}m
            </div>

            <button
              onClick={handleStart}
              className="start-button"
              disabled={hours === 0 && minutes === 0}
            >
              Start Keeping Active
            </button>
          </div>

          <div className="info-section">
            <h3 className="info-title">How it works</h3>
            <ul className="info-list">
              <li>Set your desired active duration</li>
              <li>Click start to begin the session</li>
              <li>The app will simulate clicks every minute</li>
              <li>Your system will stay awake for the duration</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
