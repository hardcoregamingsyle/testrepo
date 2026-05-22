import { z } from 'zod';
import PQueue from 'p-queue';
import { useAuthStore } from './authStore';
import { getConfig } from './config';

const mutationQueue = new PQueue({ concurrency: 1 });
const queryQueue = new PQueue({ concurrency: 10 });

export const apiClient = {
  request: async <T>(
    endpoint: string,
    schema: z.ZodSchema<T>,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    ownerId?: string,
    body?: any,
    idempotencyKey?: string
  ): Promise<T> => {
    if (!/^/[a-zA-Z0-9\-_/]+$/.test(endpoint)) throw new Error("Security Violation: Invalid Path");
    if (ownerId && useAuthStore.getState().userId !== ownerId) throw new Error("IDOR Blocked");

    const queue = method === 'GET' ? queryQueue : mutationQueue;
    
    return queue.add(async () => {
      const { API_URL } = getConfig();
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (idempotencyKey) headers['X-Idempotency-Key'] = idempotencyKey;

      const response = await fetch(new URL(endpoint, API_URL).toString(), {
        method, headers, body: body ? JSON.stringify(body) : undefined
      });

      if (response.status === 401) { useAuthStore.getState().reset(); throw new Error("Unauthorized"); }
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Empty Response");
      
      const decoder = new TextDecoder();
      let result = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        if (result.length > 1024 * 1024) throw new Error("Payload too large");
      }
      return schema.parse(JSON.parse(result));
    });
  }
};