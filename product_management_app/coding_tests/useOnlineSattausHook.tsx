import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  // 1. Initialize state with the true current status immediately
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    // 2. Define handler functions to transition state
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // 3. Listen to global browser connectivity events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 4. Crucial: Clean up listeners when the component unmounts
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Empty array ensures this binds exactly once per component mount

  // 5. Return the primitive value
  return isOnline;
}
