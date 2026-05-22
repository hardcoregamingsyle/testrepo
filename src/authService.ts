import { create } from 'zustand';

// Private state closure to prevent XSS access via window.store
let _csrfToken: string | null = null;
const _sessionID = crypto.randomUUID();

interface AuthState {
  userId: string | null;
  setSession: (userId: string, token: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  setSession: (userId, token) => {
    _csrfToken = token;
    set({ userId });
  },
  reset: () => {
    _csrfToken = null;
    set({ userId: null });
  }
}));

export const getAuthContext = () => ({
  csrfToken: _csrfToken,
  sessionID: _sessionID,
  userId: useAuthStore.getState().userId
});