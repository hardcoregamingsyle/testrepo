/**
 * Security utility for input normalization and sanitization
 */
export const sanitizeInput = (input: unknown): unknown => {
  if (typeof input === 'string') {
    // Strip C0 and C1 control characters
    return input.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (typeof input === 'object' && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [k, sanitizeInput(v)])
    );
  }
  return input;
};