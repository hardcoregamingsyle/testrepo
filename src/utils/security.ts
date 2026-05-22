/**
 * Security utility for input normalization and sanitization
 */
export const sanitizeInput = (input: unknown): string => {
  if (typeof input !== 'string') return '';
  // Strip C0 and C1 control characters and trim whitespace
  return input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
};