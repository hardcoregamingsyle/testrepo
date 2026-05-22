import path from 'path';

/**
 * FIXED: Path Traversal Prevention
 * Whitelists allowed directory and enforces basename to prevent escape.
 */
const ALLOWED_DIR = '/var/www/uploads';

export const getFile = (filename: string) => {
  const safeName = path.basename(filename);
  const safePath = path.join(ALLOWED_DIR, safeName);
  
  if (!safePath.startsWith(ALLOWED_DIR)) {
    throw new Error('ACCESS_DENIED: Path Traversal Attempt');
  }
  
  return safePath;
};