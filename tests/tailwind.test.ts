import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config.ts';

describe('Tailwind Configuration', () => {
  it('should have the correct content scanning paths', () => {
    expect(tailwindConfig.content).toContain('./src/**/*.{js,ts,jsx,tsx}');
  });

  it('should extend the sans font family', () => {
    expect(tailwindConfig.theme?.extend?.fontFamily?.sans).toEqual(['Inter', 'system-ui', 'sans-serif']);
  });
});