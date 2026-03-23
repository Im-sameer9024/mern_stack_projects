import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import Modal from '@/components/custom/Modal';

const ChangePassword = () => {
  const [openForm, setOpenForm] = useState(false);

  const onOpen = () => {
    setOpenForm(true);
  };

  const onClose = () => {
    setOpenForm(false);
  };

  return (
    <div className="bg-richBlack-800 border border-richBlack-700 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <Button
          onClick={onOpen}
          className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
        >
          <Pencil size={16} />
          Edit
        </Button>
      </div>
      <p className=" font-sm text-slate-500">
        If you want to change your password then click on Edit button ?
      </p>

      {/* Modal */}
      <Modal content={<ChangePasswordForm onClose={onClose} />} isVisible={openForm} />
    </div>
  );
};

export default ChangePassword;
