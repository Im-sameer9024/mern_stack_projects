import { Button } from '@/components/ui/button';
import CTAButton from '@/features/Home/components/CTAButton';
import React from 'react';
import { useProfileDetails } from '../hooks/useProfile';
import { Pencil } from 'lucide-react';
import Spinner from '@/components/common/Spinner';
import ProfileImage from '../components/ProfileImage';
import PersonalDetails from '../components/PersonalDetails';

const MyProfile = () => {
  const { data, isPending } = useProfileDetails();

  if (isPending) {
    return <Spinner />;
  }

  const user = data?.data;
  const details = user?.additionalDetails;

  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">My Profile</h2>

      {/* Profile Card */}
      <ProfileImage userDetails={user} />

      {/* Personal Details Card */}
      <PersonalDetails userDetails={user} additionalDetails={details} />
    </div>
  );
};

export default MyProfile;
