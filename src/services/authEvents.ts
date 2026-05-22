type AuthListener = () => void;
const listeners = new Set<AuthListener>();

export const AuthEvents = {
  subscribe: (fn: AuthListener) => { listeners.add(fn); return () => listeners.delete(fn); },
  emit: (event: 'unauthorized') => { if (event === 'unauthorized') listeners.forEach(fn => fn()); }
};