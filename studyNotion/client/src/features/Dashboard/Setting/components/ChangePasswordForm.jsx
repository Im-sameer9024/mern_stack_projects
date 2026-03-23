import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { useChangePassword } from '../hooks/useSetting';
import { useProfileDetails } from '../../Profile/hooks/useProfile';

const ChangePasswordForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const { mutateAsync: ChangePassword, isPending } = useChangePassword();
  const { data } = useProfileDetails();
  const user = data?.data;

  const onSubmit = async (data) => {
    const finalData = {
      _id: !!user._id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.newPassword,
    };
    await ChangePassword(finalData);
    onClose();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit Personal Details</h3>

        <Button onClick={onClose} disabled={isPending}>
          <RxCross2 size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Date Of Birth */}
        <InputField
          label="Old Password"
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          register={register}
          error={errors.oldPassword}
          loading={isPending}
        />

        {/* Contact Number */}
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="New Password"
          register={register}
          error={errors.newPassword}
          loading={isPending}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
        >
          {isPending ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
