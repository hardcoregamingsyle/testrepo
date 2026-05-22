import { z } from 'zod';

const configSchema = z.object({ API_URL: z.string().url() });

export const getConfig = () => {
  const raw = { API_URL: import.meta.env.VITE_API_URL };
  const result = configSchema.safeParse(raw);
  if (!result.success) {
    // Obfuscated error handling
    if (process.env.NODE_ENV !== 'production') {
       console.error('Configuration integrity failure');
    }
    throw new Error("ERR_CONFIG_INVALID");
  }
  return result.data;
};