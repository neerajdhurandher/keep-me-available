'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles/active.css';

export default function ActivePage() {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const clickBoxRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const duration = parseInt(searchParams.get('duration') || '0');
    if (duration <= 0) {
      router.push('/home');
      return;
    }

    setTimeRemaining(duration * 60); // Convert minutes to seconds
    setIsActive(true);

    return () => {
      // Cleanup function will run when component unmounts or dependencies change
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (clickIntervalRef.current) {
        clearInterval(clickIntervalRef.current);
        clickIntervalRef.current = null;
      }
    };
  }, [searchParams, router]);

  // Separate effect for managing the countdown timer
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Clear intervals when timer reaches 0
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (clickIntervalRef.current) {
            clearInterval(clickIntervalRef.current);
            clickIntervalRef.current = null;
          }
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]);

  const simulateClick = () => {
    if (clickBoxRef.current) {
      const rect = clickBoxRef.current.getBoundingClientRect();
      const randomX = Math.random() * (rect.width - 20) + 10;
      const randomY = Math.random() * (rect.height - 20) + 10;
      
      // Create visual click effect
      const clickIndicator = document.createElement('div');
      clickIndicator.className = 'click-indicator';
      clickIndicator.style.left = `${randomX}px`;
      clickIndicator.style.top = `${randomY}px`;
      
      clickBoxRef.current.appendChild(clickIndicator);
      
      // Remove the indicator after animation
      setTimeout(() => {
        if (clickIndicator.parentNode) {
          clickIndicator.parentNode.removeChild(clickIndicator);
        }
      }, 1000);

      setClickCount(prev => prev + 1);
    }
  };

  // Separate effect for managing the click simulation
  useEffect(() => {
    if (!isActive) return;

    // Start the click simulation every minute
    clickIntervalRef.current = setInterval(() => {
      simulateClick();
    }, 60000); // 60 seconds

    return () => {
      if (clickIntervalRef.current) {
        clearInterval(clickIntervalRef.current);
        clickIntervalRef.current = null;
      }
    };
  }, [isActive]);

  // Separate effect for handling completion redirect
  useEffect(() => {
    if (!isActive && timeRemaining === 0) {
      // Redirect to completion page after a short delay
      const redirectTimeout = setTimeout(() => {
        router.push('/complete');
      }, 2000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isActive, timeRemaining, router]);



  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopSession = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (clickIntervalRef.current) clearInterval(clickIntervalRef.current);
    router.push('/complete');
  };

  return (
    <div className="active-container">
      <div className="active-header">
        <h1 className="active-title">Keep Me Available</h1>
        <div className="time-display">
          <span className="time-label">Time Remaining:</span>
          <span className="time-value">{formatTime(timeRemaining)}</span>
        </div>
        <div className="session-info">
          <span className="click-counter">Clicks: {clickCount}</span>
          <button onClick={handleStopSession} className="stop-button">
            Stop Session
          </button>
        </div>
      </div>

      <div className="main-area">
        <div 
          ref={clickBoxRef}
          className="click-box"
          onClick={simulateClick}
        >
          <div className="screensaver-animation">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>
            <div className="floating-orb orb-4"></div>
          </div>
          
          <div className="box-content">
            <div className="status-indicator">
              <div className={`status-dot ${isActive ? 'active' : 'inactive'}`}></div>
              <span className="status-text">
                {isActive ? 'Keeping System Active' : 'Session Ending...'}
              </span>
            </div>
            
            <p className="instruction-text">
              Click anywhere in this area to manually trigger activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}