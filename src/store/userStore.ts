import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  profile: { version: 0 },
  updateProfile: async (newData) => {
    const response = await fetch('/api/user/update', { method: 'POST', body: JSON.stringify(newData) });
    if (response.status === 409) {
      alert('Conflict detected, refreshing state...');
      window.location.reload();
    }
  }
}));