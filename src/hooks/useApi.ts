import { useEffect, useRef } from 'react';
import { request, RequestPriority } from '../apiClient';
import { z } from 'zod';

export const useApi = () => {
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    controller.current = new AbortController();
    return () => controller.current?.abort();
  }, []);

  return {
    call: <T, B>(path: string, options: Parameters<typeof request>[1], schema: z.ZodSchema<T>) => 
      request(path, { ...options, signal: controller.current?.signal }, schema),
    priority: RequestPriority
  };
};