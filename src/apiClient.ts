import { z } from 'zod';
import { getConfig } from './config';
import { getAuthContext } from './authService';

const MAX_RESPONSE_SIZE = 100 * 1024;

export const apiClient = {
  request: async <T>(endpoint: string, schema: z.ZodSchema<T>, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<T> => {
    const url = new URL(endpoint, getConfig().API_URL);
    if (url.pathname.includes('..') || url.pathname.includes('//')) throw new Error("Security Violation");

    const { csrfToken, sessionID } = getAuthContext();
    if (!csrfToken) throw new Error("Auth Required");

    const response = await fetch(url.toString(), {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'X-Idempotency-Key': `${sessionID}:${crypto.randomUUID()}`
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) throw new Error("Payload too large");

    const data = await response.json();
    return schema.strict().parse(data);
  }
};