import { z } from 'zod';

const configSchema = z.object({ 
  API_URL: z.string().url(),
  ALLOWED_ENDPOINTS: z.array(z.string()).default(['/auth/session', '/api/data', '/api/profile'])
});

// Fixed: Hardcoded API_URL at build time prevents runtime mutation
const CONSTANT_CONFIG = Object.freeze({
  API_URL: "https://api.myapp.com", 
  ALLOWED_ENDPOINTS: ['/auth/session', '/api/data', '/api/profile']
});

export const getConfig = () => {
  const result = configSchema.safeParse(CONSTANT_CONFIG);
  if (!result.success) throw new Error("ERR_INTERNAL_CONFIG");
  return result.data;
};