import { z } from 'zod';

const configSchema = z.object({ API_URL: z.string().url() });

export const getConfig = () => {
  const result = configSchema.safeParse({ API_URL: import.meta.env.VITE_API_URL });
  if (!result.success) {
    // Info Disclosure Fix: No console logs in prod
    throw new Error("CONFIG_ERR");
  }
  return Object.freeze(result.data);
};