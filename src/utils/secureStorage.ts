/**
 * @deprecated Use browser native sessionStorage for sensitive data.
 * Obfuscation via btoa is not security.
 */
export const secureStorage = {
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  getItem: (key: string) => localStorage.getItem(key),
  removeItem: (key: string) => localStorage.removeItem(key)
};