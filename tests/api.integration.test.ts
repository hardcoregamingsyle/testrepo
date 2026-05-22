import { describe, it, expect, vi } from 'vitest';
import { setupInterceptors } from '../src/services/api/interceptors';

describe('API Interceptors', () => {
  it('should inject Authorization header from session storage', () => {
    sessionStorage.setItem('auth_token', 'test-token');
    const mockConfig = { headers: {} } as any;
    const mockInstance = { interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } } };
    
    setupInterceptors(mockInstance);
    // Simulate interceptor logic
    const requestHandler = mockInstance.interceptors.request.use.mock.calls[0][0];
    const result = requestHandler(mockConfig);
    
    expect(result.headers.Authorization).toBe('Bearer test-token');
    sessionStorage.clear();
  });
});