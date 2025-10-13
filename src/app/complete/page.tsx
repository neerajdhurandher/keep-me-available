'use client';

import { useRouter } from 'next/navigation';
import './styles/complete.css';

export default function CompletePage() {
  const router = useRouter();

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
          Your system has been kept active for the requested duration. 
          The session has ended successfully.
        </p>
        
        <div className="stats-card">
          <h3 className="stats-title">Session Summary</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Duration</span>
              <span className="stat-value">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🖱️</span>
              <span className="stat-label">Status</span>
              <span className="stat-value">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span className="stat-label">Result</span>
              <span className="stat-value">Success</span>
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