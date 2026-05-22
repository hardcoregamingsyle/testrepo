```typescript
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProfileUpdatePayloadSchema, type ProfileUpdatePayload } from '../types';

interface ProfileFormProps {
  initialData: ProfileUpdatePayload;
  onSubmit: (data: ProfileUpdatePayload) => Promise<void>;
  isSubmitting?: boolean;
}

export const ProfileForm = memo(({ initialData, onSubmit, isSubmitting }: ProfileFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileUpdatePayload>({
    resolver: zodResolver(ProfileUpdatePayloadSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea {...register('bio')} className="w-full border rounded-md p-2" rows={4} />
        {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
      </div>
      <Button type="submit" isLoading={isSubmitting}>Update Profile</Button>
    </form>
  );
});
ProfileForm.displayName = 'ProfileForm';
```