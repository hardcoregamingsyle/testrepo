import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../src/store/useStore';

describe('Global State Management (Zustand)', () => {
  beforeEach(() => {
    // Reset state to known defaults
    const state = useStore.getState();
    state.ui.theme = 'light';
    state.ui.isSidebarOpen = true;
    state.user.preferences = {};
  });

  it('should toggle theme correctly', () => {
    useStore.getState().ui.toggleTheme();
    expect(useStore.getState().ui.theme).toBe('dark');
  });

  it('should update user preferences correctly', () => {
    useStore.getState().user.setPreference('lang', 'en');
    expect(useStore.getState().user.preferences.lang).toBe('en');
  });

  it('should maintain slice isolation', () => {
    useStore.getState().ui.toggleSidebar();
    expect(useStore.getState().ui.isSidebarOpen).toBe(false);
    expect(useStore.getState().user.preferences).toEqual({});
  });
});