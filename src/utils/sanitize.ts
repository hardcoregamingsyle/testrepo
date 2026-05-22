import DOMPurify from 'dompurify';

/**
 * MANDATORY: Use this utility for all dynamic HTML rendering
 */
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  });
};