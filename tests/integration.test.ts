import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Build Infrastructure Integration', () => {
  it('should have Tailwind directives in CSS', () => {
    const cssContent = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf-8');
    expect(cssContent).toContain('@tailwind base;');
    expect(cssContent).toContain('@tailwind components;');
    expect(cssContent).toContain('@tailwind utilities;');
  });

  it('should have CSP headers configured in Nginx', () => {
    const nginxConf = fs.readFileSync(path.resolve(__dirname, '../nginx.conf'), 'utf-8');
    expect(nginxConf).toContain('Content-Security-Policy');
    expect(nginxConf).toContain("style-src 'self'");
  });
});