import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().trim().min(2).max(100),
  bio: z.string().trim().max(500).optional(),
}).strict();

export const ProfileUpdatePayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  bio: z.string().trim().max(500).optional(),
}).strict();

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type ProfileUpdatePayload = z.infer<typeof ProfileUpdatePayloadSchema>;