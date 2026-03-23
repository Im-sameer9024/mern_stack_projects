import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import Detailsgrid from './Detailsgrid';
import Modal from '@/components/custom/Modal';
import ProfileDetailsForm from './ProfileDetailsForm';
import { Button } from '@/components/ui/button';

const PersonalDetails = ({ userDetails, additionalDetails }) => {
  const [openForm, setOpenForm] = useState(false);

  const onOpen = () => {
    setOpenForm(true);
  };

  return (
    <div className="bg-richBlack-800 border border-richBlack-700 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Personal Details</h3>

        <Button
          onClick={onOpen}
          className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
        >
          <Pencil size={16} />
          Edit
        </Button>
      </div>

      {/* Details Grid */}
      <Detailsgrid userDetails={userDetails} additionalDetails={additionalDetails} />

      {/* Modal */}
      <Modal
        content={
          <ProfileDetailsForm setOpenForm={setOpenForm} additionalDetails={additionalDetails} />
        }
        isVisible={openForm}
      />
    </div>
  );
};

export default PersonalDetails;
