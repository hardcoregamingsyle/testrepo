import { z } from 'zod';
import PQueue from 'p-queue';

const MAX_DEPTH = 5;
const checkDepth = (obj: any, depth = 0): void => {
  if (depth > MAX_DEPTH) throw new Error('MAX_DEPTH_EXCEEDED');
  if (obj !== null && typeof obj === 'object') {
    Object.values(obj).forEach(v => checkDepth(v, depth + 1));
  }
};

class CSRFTokenManager {
  private static token: string | null = null;
  static async getToken(signal?: AbortSignal): Promise<string> {
    if (this.token) return this.token;
    const r = await fetch('/api/csrf-token', { signal });
    if (!r.ok) throw new Error('CSRF_FETCH_FAILED');
    const d = await r.json() as { token: string };
    this.token = d.token;
    return d.token;
  }
}

const queue = new PQueue({ concurrency: 10 });

export const apiClient = {
  request: async <T>(endpoint: string, schema: z.ZodSchema<T>, method: 'GET' | 'POST', body?: unknown): Promise<T> => {
    const controller = new AbortController();
    try {
      if (body) checkDepth(body);
      const serializedBody = body ? JSON.stringify(body) : undefined;

      return await queue.add(async () => {
        const token = await CSRFTokenManager.getToken(controller.signal);
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
          body: serializedBody,
          signal: controller.signal
        });
        if (!response.ok) throw new Error('API_ERROR');
        return schema.parse(await response.json());
      }) as T;
    } finally {
      controller.abort();
    }
  }
};