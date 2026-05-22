import { StateCreator } from 'zustand';

export interface UserState {
  preferences: Record<string, string>;
  lastVisited: string | null;
}

export interface UserActions {
  setPreference: (key: string, value: string) => void;
  setLastVisited: (path: string) => void;
}

export type UserSlice = { user: UserState & UserActions };

export const createUserSlice: StateCreator<UserSlice, [['zustand/immer', never]], [], UserSlice> = (set) => ({
  user: {
    preferences: {},
    lastVisited: null,
    setPreference: (key, value) =>
      set((state) => {
        state.user.preferences[key] = value;
      }),
    setLastVisited: (path) =>
      set((state) => {
        state.user.lastVisited = path;
      }),
  },
});