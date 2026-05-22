import { z } from 'zod';

const configSchema = z.object({ 
  API_URL: z.string().url()
});

class ConfigManager {
  private static instance: Readonly<{ API_URL: string }>;

  static get() {
    if (!this.instance) {
      const result = configSchema.safeParse({ API_URL: import.meta.env.VITE_API_URL });
      if (!result.success) throw new Error("Invalid environment configuration");
      this.instance = Object.freeze(result.data);
    }
    return this.instance;
  }
}

export const getConfig = () => ConfigManager.get();