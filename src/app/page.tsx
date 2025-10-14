'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /home immediately
    router.replace('/home');
  }, [router]);

  // Show a loading message while redirecting
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1b1a1a 0%, #2a2929 50%, #1b1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffe600',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Keep Me Available</h1>
        <p>Redirecting to home page...</p>
      </div>
    </div>
  );
}
