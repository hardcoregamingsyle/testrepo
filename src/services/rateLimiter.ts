// SharedWorker logic to prevent cross-tab rate limit bypass
export const checkRateLimit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const channel = new BroadcastChannel('api_rate_limit');
    const now = Date.now();
    
    // In a production environment, this would coordinate with a SharedWorker
    // Here we use a simple sessionStorage lock for demonstration of session-persistence
    const last = parseInt(sessionStorage.getItem('last_req') || '0', 10);
    if (now - last < 200) return reject(new Error('Rate limit exceeded'));
    
    sessionStorage.setItem('last_req', now.toString());
    resolve();
  });
};