import { create } from 'zustand';

interface ConfigState {
  API_URL: string;
  setApiUrl: (url: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  API_URL: import.meta.env.VITE_API_URL || '',
  setApiUrl: (url) => set({ API_URL: url }),
}));