import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateProfile } from '../hooks/useProfile';
import InputField from '@/components/custom/InputField';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';



const ProfileDetailsForm = ({ setOpenForm, additionalDetails }) => {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: additionalDetails?.gender || '',
      dateOfBirth: additionalDetails?.dateOfBirth || '',
      about: additionalDetails?.about || '',
      contactNumber: additionalDetails?.contactNumber || '',
    },
  });

  const onClose = () => setOpenForm(false);

  const onSubmit = async (data) => {
    await updateProfile(data);
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
        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-richBlack-100">Gender</label>

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full bg-richBlack-700 border border-richBlack-600`}>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.gender && <span className="text-red-400 text-xs">{errors.gender.message}</span>}
        </div>

        {/* Date Of Birth */}
        <InputField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          placeholder="Select date of birth"
          register={register}
          error={errors.dateOfBirth}
          loading={isPending}
        />

        {/* Contact Number */}
        <InputField
          label="Contact Number"
          name="contactNumber"
          type="tel"
          placeholder="Enter phone number"
          register={register}
          error={errors.contactNumber}
          loading={isPending}
        />

        {/* About */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-richBlack-100">About</label>

          <Textarea
            {...register('about')}
            rows={5}
            placeholder="Tell us about yourself"
            disabled={isPending}
            className={`w-full bg-richBlack-700 border border-richBlack-600 resize-none pt-2`}
          />

          {errors.about && <span className="text-red-400 text-xs">{errors.about.message}</span>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
        >
          {isPending ? 'Updating...' : 'Update Details'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
