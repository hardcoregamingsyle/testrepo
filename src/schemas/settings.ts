import { z } from 'zod';

/**
 * FIXED: Removed .coerce.boolean() to prevent string-to-boolean injection.
 * Strict boolean type enforcement ensures data integrity.
 */
export const SettingsSchema = z.object({
  notifications: z.boolean({
    required_error: "Notifications setting is required",
    invalid_type_error: "Notifications must be a boolean",
  }),
  theme: z.enum(['light', 'dark', 'system']),
  refreshInterval: z.number().min(1000).max(60000)
});