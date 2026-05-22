import React, { useEffect, useState, useCallback, useRef } from 'react';
import { profileService } from './profileService';
import { ProfileForm } from './components/ProfileForm';
import { Card } from '@/components/ui/Card';
import type { UserProfile, ProfileUpdatePayload } from './types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);

  const loadProfile = useCallback(async (signal: AbortSignal) => {
    try {
      const data = await profileService.getProfile(signal);
      if (mounted.current) setProfile(data);
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadProfile(controller.signal);
    return () => controller.abort();
  }, [loadProfile]);

  const handleSubmit = async (data: ProfileUpdatePayload) => {
    setIsSubmitting(true);
    try {
      const updated = await profileService.updateProfile(data);
      if (mounted.current) setProfile(updated);
    } finally {
      if (mounted.current) setIsSubmitting(false);
    }
  };

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <Card className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-6">User Profile</h2>
      <ProfileForm initialData={profile} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Card>
  );
};

export default Profile;