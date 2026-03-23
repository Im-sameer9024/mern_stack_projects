/* eslint-disable react-hooks/incompatible-library */
import { maskEmail } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordDataValidator } from '../validation/Password.validation';
import { Link, useParams } from 'react-router-dom';
import { useResetPassword } from '../hooks/useAuth';
import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(ResetPasswordDataValidator),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const newPasswordValidate = watch('newPassword');
  const confirmNewPasswordValidate = watch('confirmNewPassword');

  const { mutateAsync: ResetPassword, isPending } = useResetPassword();

  const { token } = useParams();

  const onSubmit = async (data) => {
    const final = {
      token,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };
    try {
      const res = await ResetPassword(final);
      setEmail(res.data?.email);
    } catch (error) {
      console.log('Error occur in resetPassword', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-lg space-y-8">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {email ? 'Reset complete!' : 'Choose new password'}
          </h2>

          <p className="text-richBlack-200 text-sm sm:text-base leading-relaxed">
            {email
              ? `All done! We have sent an email to ${maskEmail(email)}`
              : 'Almost done. Enter your new password to complete your reset password.'}
          </p>
        </div>
        {email ? (
          <Button
            asChild
            className="w-full h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-medium text-base rounded-md"
          >
            <Link to={'/login'}>Return to login</Link>
          </Button>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              register={register}
              error={errors.newPassword}
            />

            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              placeholder="Enter Confirm New Password"
              register={register}
              error={errors.confirmNewPassword}
            />

            {/* Button */}
            <Button
              type="submit"
              disabled={!newPasswordValidate || !confirmNewPasswordValidate}
              className="w-full h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-medium text-base rounded-md"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center text-sm text-richBlack-200">
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-white transition hover:underline underline-offset-2"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
