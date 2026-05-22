import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  logout: () => void;
  resetSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      logout: () => set({ isAuth: false }),
      resetSession: () => set({ isAuth: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuth: state.isAuth }), // Exclude sensitive role data
    }
  )
);