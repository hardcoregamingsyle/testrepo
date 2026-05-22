import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

export interface ApiRequestConfig<D = any> extends AxiosRequestConfig<D> {
  queueKey?: string;
  schema?: z.ZodSchema<D>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}