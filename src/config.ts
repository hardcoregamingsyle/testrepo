export const getConfig = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) throw new Error("Build-time configuration missing: VITE_API_URL");
  return Object.freeze({ API_URL });
};