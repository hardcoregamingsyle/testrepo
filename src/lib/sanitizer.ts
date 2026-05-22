import DOMPurify from 'dompurify';

export const deepSanitize = (data: unknown): any => {
  if (typeof data === 'string') {
    return DOMPurify.sanitize(data.normalize('NFKC'));
  }
  if (Array.isArray(data)) return data.map(deepSanitize);
  if (data !== null && typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, val]) => {
      acc[key] = deepSanitize(val);
      return acc;
    }, {} as Record<string, any>);
  }
  return data;
};