import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  revalidating: boolean;
  setSession: (data: { userId: string }, offset: number) => void;
  setRevalidating: (status: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  revalidating: false,
  setSession: (data, _) => set({ userId: data.userId, revalidating: false }),
  setRevalidating: (status) => set({ revalidating: status }),
  reset: () => set({ userId: null, revalidating: false }),
}));