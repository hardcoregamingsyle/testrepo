/**
 * Cross-tab synchronization service for concurrency control.
 */
const channel = new BroadcastChannel('api_sync');

export const acquireLock = async (): Promise<void> => {
  return new Promise((resolve) => {
    channel.postMessage({ type: 'LOCK_REQUEST' });
    channel.onmessage = (e) => {
      if (e.data.type === 'LOCK_GRANTED') resolve();
    };
  });
};