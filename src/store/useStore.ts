import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createUISlice, type UISlice } from './slices/uiSlice';
import { createUserSlice, type UserSlice } from './slices/userSlice';

export type RootState = UISlice & UserSlice;

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useStore = create<RootState>()(
  persist(
    immer((...a) => ({
      ui: createUISlice(...a).ui,
      user: createUserSlice(...a).user,
    })),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => {
        try {
          return typeof window !== 'undefined' ? window.localStorage : noopStorage;
        } catch {
          return noopStorage;
        }
      }),
      partialize: (state) => ({
        ui: state.ui,
      }),
      version: 1,
    }
  )
);