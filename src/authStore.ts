import { create } from 'zustand';

interface AuthState {
  csrfToken: string | null;
  userId: string | null;
  setSession: (data: { token: string; userId: string }, idleTimeout: number) => void;
  reset: () => void;
}

let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  csrfToken: null,
  userId: null,
  setSession: (data, idleTimeout = 900000) => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => useAuthStore.getState().reset(), idleTimeout);
    set({ csrfToken: data.token, userId: data.userId });
  },
  reset: () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    set({ csrfToken: null, userId: null });
  }
}));