import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getConfig, resetConfig } from '../src/config';

describe('Config Initialization', () => {
  beforeEach(() => {
    resetConfig();
    vi.unstubAllEnvs();
  });

  it('should validate correct API_URL', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.production.com');
    const config = await getConfig();
    expect(config.API_URL).toBe('https://api.production.com');
  });
});