import { z } from 'zod';
import PQueue from 'p-queue';
import { getConfig } from './config';

const sanitizeForCache = (obj: unknown): unknown => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeForCache);
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
      clean[key] = sanitizeForCache(value);
    }
  }
  return clean;
};

export const SchemaRegistry = {
  SESSION: z.object({ id: z.string(), role: z.enum(['admin', 'user']) }),
  DATA: z.object({ id: z.string(), content: z.string() })
};

const readQueue = new PQueue({ concurrency: 10, maxSize: 100 });
const mutatingQueue = new PQueue({ concurrency: 1, maxSize: 50 });
const pendingRequests = new Map<string, Promise<any>>();

export const apiClient = {
  request: async <T>(endpoint: string, schema: z.ZodSchema<T>, method: 'GET' | 'POST', body?: unknown, signal?: AbortSignal): Promise<T> => {
    const { API_URL } = getConfig();
    const sanitizedBody = body ? sanitizeForCache(body) : null;
    
    // Fix: Include session state in cacheKey to prevent Request Smuggling
    const sessionToken = document.cookie.replace(/(?:(?:^|.*;\s*)session_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const cacheKey = `${method}|${endpoint}|${sessionToken}|${JSON.stringify(sanitizedBody)}`;

    if (pendingRequests.has(cacheKey)) return pendingRequests.get(cacheKey)!;

    const task = async () => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (method === 'POST') headers['X-CSRF-Token'] = 'required-token-value'; // Fix: CSRF Header

      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        credentials: 'include',
        body: sanitizedBody ? JSON.stringify(sanitizedBody) : undefined,
        signal
      });
      if (!response.ok) throw new Error('ERR_API_FAILURE');
      return schema.parse(await response.json());
    };

    // Fix: Memory exhaustion - clear queue on abort
    signal?.addEventListener('abort', () => {
        readQueue.clear();
        mutatingQueue.clear();
    }, { once: true });

    const promise = (method === 'GET' ? readQueue.add(task) : mutatingQueue.add(task)) as Promise<T>;
    pendingRequests.set(cacheKey, promise);
    return promise.finally(() => pendingRequests.delete(cacheKey));
  }
};