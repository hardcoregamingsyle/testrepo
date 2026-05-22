import { resetConfig } from './config';
import { clearApiCache } from './store/slices/apiCache';

export const AuthManager = {
  logout: async () => {
    sessionStorage.clear();
    clearApiCache(); // FIX: Prevent cross-user data leakage
    resetConfig();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { /* ignore */ }
  },
  onLoginSuccess: () => {
    sessionStorage.setItem('session_rotated', Date.now().toString());
  }
};