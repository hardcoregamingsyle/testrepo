import { z } from 'zod';
import PQueue from 'p-queue';
import pRetry from 'p-retry';
import DOMPurify from 'dompurify';

const queue = new PQueue({ concurrency: 10 });

const deepSanitize = (data: unknown): unknown => {
  if (typeof data === 'string') return DOMPurify.sanitize(data);
  if (Array.isArray(data)) return data.map(deepSanitize);
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, deepSanitize(v)]));
  }
  return data;
};

const getCacheKey = (endpoint: string, body?: object): string => {
  const hash = btoa(JSON.stringify(body || {}));
  return `${endpoint}:${hash.slice(0, 16)}`;
};

export const SchemaRegistry = Object.freeze({
  SESSION: z.object({ userId: z.string(), role: z.string(), csrfToken: z.string(), issuedAt: z.number() }).strict(),
});

export const apiClient = {
  request: async <T>(
    endpoint: string, 
    schema: z.ZodSchema<T>, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    body?: Record<string, unknown>,
    csrfToken?: string, 
    signal?: AbortSignal
  ): Promise<T> => {
    return queue.add(async () => {
      const headers: Record<string, string> = { 
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID()
      };
      if (csrfToken && ['POST', 'PUT', 'DELETE'].includes(method)) {
        headers['X-CSRF-TOKEN'] = csrfToken;
      }

      const sanitizedBody = body ? JSON.stringify(deepSanitize(body)) : undefined;
      
      const response = await pRetry(async () => {
        const res = await fetch(endpoint, { method, headers, body: sanitizedBody, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      }, { retries: 3, signal });

      return schema.parse(response);
    }, { signal }) as Promise<T>;
  }
};