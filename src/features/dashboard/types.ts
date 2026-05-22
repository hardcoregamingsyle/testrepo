import { z } from 'zod';

/**
 * Dashboard Data Schemas
 * Defines the structure of dashboard widgets and activity feeds.
 */
export const DashboardStatsSchema = z.object({
  totalUsers: z.number().int().nonnegative(),
  activeSessions: z.number().int().nonnegative(),
  systemHealth: z.number().min(0).max(100),
}).strict();

export const ActivityItemSchema = z.object({
  id: z.string().uuid(),
  action: z.string(),
  timestamp: z.string().datetime(),
  user: z.string(),
}).strict();

export const DashboardDataSchema = z.object({
  stats: DashboardStatsSchema,
  recentActivity: z.array(ActivityItemSchema),
}).strict();

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
export type ActivityItem = z.infer<typeof ActivityItemSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;