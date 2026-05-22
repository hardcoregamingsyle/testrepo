import { LRUCache } from 'lru-cache';

export const apiCache = new LRUCache<string, any>({
  max: 100,
  ttl: 1000 * 60 * 5,
});

export const clearApiCache = () => apiCache.clear();