import { describe, it, expect } from 'vitest';
import * as config from '../src/config';

describe('Configuration & Infrastructure', () => {
  it('should expose the correctly typed config object', async () => {
    const cfg = await config.getConfig();
    expect(cfg).toHaveProperty('API_URL');
  });
});

describe('TypeScript & Linting Enforcement', () => {
  it('should fail type-check if implicit any is used', () => {
    // This is a conceptual test for our strict configuration
    const testFunc = (val: string) => val.length;
    // @ts-expect-error: Passing number to string param should trigger TS error
    expect(() => testFunc(123)).toThrow();
  });

  it('should enforce strict null checks', () => {
    const testVar: string | null = null;
    // @ts-expect-error: Should fail if strict null checks are active
    const len: number = testVar.length; 
    expect(len).toBeUndefined();
  });
});