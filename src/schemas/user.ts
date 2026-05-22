import { z } from 'zod';

export const UserProfileSchema = z.strictObject({
  bio: z.string().min(0).max(2048),
  age: z.number().int().min(0).max(150),
  theme: z.enum(['light', 'dark']), // Prevents bool/number/string coercion errors
});

export const LoginSchema = z.strictObject({
  email: z.string().email().max(255),
  password: z.string().min(8).max(2048),
});