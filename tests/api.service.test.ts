import { describe, it, expect, vi } from 'vitest';
import { request } from '../src/apiClient';
import { z } from 'zod';

// Mock axios instance to prevent real network calls
vi.mock('axios', () => ({
  default: {
    create: () => ({
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
      request: vi.fn().mockResolvedValue({ data: { id: 1 } })
    })
  }
}));

describe('API Service Layer Integration', () => {
  it('should validate response against Zod schema', async () => {
    const schema = z.object({ id: z.number() });
    const result = await request('/test', { method: 'GET' }, schema);
    expect(result).toEqual({ id: 1 });
  });

  it('should throw validation error for schema mismatch', async () => {
    const schema = z.object({ id: z.string() });
    await expect(request('/test', { method: 'GET' }, schema)).rejects.toThrow();
  });
});