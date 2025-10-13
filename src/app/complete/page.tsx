'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './styles/complete.css';

export default function CompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState({
    duration: 0,
    hours: 0,
    minutes: 0,
    clicks: 0,
    stopped: false
  });

  useEffect(() => {
    const duration = parseInt(searchParams.get('duration') || '0');
    const hours = parseInt(searchParams.get('hours') || '0');
    const minutes = parseInt(searchParams.get('minutes') || '0');
    const clicks = parseInt(searchParams.get('clicks') || '0');
    const stopped = searchParams.get('stopped') === 'true';

    setSessionData({ duration, hours, minutes, clicks, stopped });
  }, [searchParams]);

  const formatDuration = () => {
    const { hours, minutes } = sessionData;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleGoHome = () => {
    console.log('Go Home button clicked - navigating to home page');
    try {
      router.push('/home');
      console.log('Navigation called successfully');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: use window.location
      window.location.href = '/home';
    }
  };

  return (
    <div className="complete-container">
      <div className="complete-content">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>
        
        <h1 className="complete-title">Task Completed!</h1>
        
        <p className="complete-message">
          Your system has been kept active for {formatDuration()}. 
          The session has ended {sessionData.stopped ? 'manually' : 'successfully'}.
        </p>
        
        <div className="stats-card">
          <h3 className="stats-title">Session Summary</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Duration</span>
              <span className="stat-value">{formatDuration()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🖱️</span>
              <span className="stat-label">Clicks</span>
              <span className="stat-value">{sessionData.clicks}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span className="stat-label">Status</span>
              <span className="stat-value">{sessionData.stopped ? 'Stopped' : 'Completed'}</span>
            </div>
          </div>
        </div>
        
        <button onClick={handleGoHome} className="home-button">
          Go to Home Page
        </button>
        
        <div className="background-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>
    </div>
  );
}