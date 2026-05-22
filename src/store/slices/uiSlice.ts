import { StateCreator } from 'zustand';

export interface UIState {
  theme: 'light' | 'dark';
  isSidebarOpen: boolean;
}

export interface UIActions {
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export type UISlice = { ui: UIState & UIActions };

export const createUISlice: StateCreator<UISlice, [['zustand/immer', never]], [], UISlice> = (set) => ({
  ui: {
    theme: 'light',
    isSidebarOpen: true,
    toggleTheme: () =>
      set((state) => {
        state.ui.theme = state.ui.theme === 'light' ? 'dark' : 'light';
      }),
    toggleSidebar: () =>
      set((state) => {
        state.ui.isSidebarOpen = !state.ui.isSidebarOpen;
      }),
  },
});