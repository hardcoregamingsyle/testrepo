import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).strict().strip(); // .strip() removes unknown keys; .strict() throws on unknown keys

// ... rest of file