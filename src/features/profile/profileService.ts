import { request } from '@/apiClient';
import { UserProfileSchema, ProfileUpdatePayloadSchema, type UserProfile, type ProfileUpdatePayload } from './types';

export const profileService = {
  getProfile: async (signal?: AbortSignal): Promise<UserProfile> => {
    return await request<UserProfile, undefined>(
      '/profile',
      { method: 'GET', signal },
      UserProfileSchema
    );
  },

  updateProfile: async (payload: ProfileUpdatePayload, signal?: AbortSignal): Promise<UserProfile> => {
    return await request<UserProfile, ProfileUpdatePayload>(
      '/profile',
      { 
        method: 'PATCH', 
        body: payload, 
        bodySchema: ProfileUpdatePayloadSchema, 
        signal 
      },
      UserProfileSchema
    );
  }
};