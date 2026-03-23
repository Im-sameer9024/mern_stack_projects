import Modal from '@/components/custom/Modal';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import ProfileImageForm from './ProfileImageForm';

const ProfileImage = ({ userDetails }) => {
  const [openImageForm, setOpenImageForm] = useState(false);

  const onOpen = () => {
    setOpenImageForm(true);
  };

  return (
    <div className="bg-richBlack-800 border border-richBlack-700 rounded-lg p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={userDetails?.avatar}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold">
            {userDetails?.firstName} {userDetails?.lastName}
          </h3>

          <p className="text-sm text-richBlack-300">{userDetails?.email}</p>
        </div>
      </div>

      {/* Edit Button */}
      <Button
        onClick={onOpen}
        className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
      >
        <Pencil size={16} />
        Edit
      </Button>

      <Modal
        content={<ProfileImageForm setOpenImageForm={setOpenImageForm} />}
        isVisible={openImageForm}
      />
    </div>
  );
};

export default ProfileImage;
