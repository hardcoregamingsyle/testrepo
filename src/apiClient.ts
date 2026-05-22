import { z } from 'zod';
import pRetry from 'p-retry';
import PQueue from 'p-queue';
import { getConfig } from './config';

const queue = new PQueue({ concurrency: 5 });
const pendingRequests = new Map<string, Promise<any>>();

export const SchemaRegistry = Object.freeze({
  SESSION: z.object({ id: z.string(), role: z.enum(['user', 'guest', 'admin']) }).strict(),
});

export const apiClient = {
  request: async <T>(endpoint: string, schema: z.ZodSchema<T>, method: 'GET' | 'POST', body?: unknown, signal?: AbortSignal): Promise<T> => {
    const { ALLOWED_ENDPOINTS } = getConfig();
    if (!ALLOWED_ENDPOINTS.includes(endpoint)) throw new Error('ERR_FORBIDDEN');
    
    const cacheKey = `${method}:${endpoint}:${JSON.stringify(body)}`;
    if (method === 'GET' && pendingRequests.has(cacheKey)) return pendingRequests.get(cacheKey);

    const task = queue.add(async () => {
      try {
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: body ? JSON.stringify(schema.parse(body)) : undefined,
          signal
        });

        if (!response.ok) throw new Error('ERR_API_UNAVAILABLE');
        const data = await response.json();
        return schema.parse(data);
      } catch (err) {
        if (err instanceof z.ZodError) throw new Error('ERR_VALIDATION');
        throw err;
      }
    });

    if (method === 'GET') {
      pendingRequests.set(cacheKey, task);
      task.finally(() => pendingRequests.delete(cacheKey));
    }

    return pRetry(() => task, { retries: 3 });
  }
};