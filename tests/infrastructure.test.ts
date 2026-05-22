import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Cloudflare Pages Infrastructure Hardening', () => {
  it('should have a strict Content-Security-Policy in public/_headers', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../public/_headers'), 'utf-8');
    expect(content).toContain('Content-Security-Policy: default-src \'self\'');
    expect(content).toContain('frame-ancestors \'none\'');
    expect(content).toContain('connect-src \'self\' https://api.production.com');
  });

  it('should enforce HSTS with subdomains and preload', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../public/_headers'), 'utf-8');
    expect(content).toContain('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
  });

  it('should have a valid _redirects file for SPA routing', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../public/_redirects'), 'utf-8');
    expect(content.trim()).toBe('/*    /index.html   200');
  });

  it('should not contain a redundant root _headers file', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../_headers'))).toBe(false);
  });
});