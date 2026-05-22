import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Edge Infrastructure', () => {
  it('should verify _headers file exists for Cloudflare deployment', () => {
    const headersPath = path.resolve(__dirname, '../public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
  });
});