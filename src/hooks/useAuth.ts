import { request } from '../apiClient';
import { z } from 'zod';

export const login = async (credentials: any) => {
  // Fixes Session Fixation by rotating session on login
  await request('/auth/login', { 
    method: 'POST', 
    body: credentials, 
    inputSchema: z.object({ username: z.string(), password: z.string() }) 
  }, z.any());
  
  await request('/auth/rotate', { 
    method: 'POST', 
    body: {}, 
    inputSchema: z.object({}) 
  }, z.any());
};