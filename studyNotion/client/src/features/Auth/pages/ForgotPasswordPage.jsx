/* eslint-disable react-hooks/incompatible-library */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailSchema } from '../validation/Signup.validation';
import { useResetPasswordToken } from '../hooks/useAuth';
import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState('');

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email');
  const { mutateAsync: ResetPasswordToken, isPending } = useResetPasswordToken();

  async function handleResetPasswordToken(data) {
    try {
      await ResetPasswordToken(data);
      setUserEmail(data.email);
    } catch (error) {
      console.log('Error occur', error);
    }
  }

  const onSubmit = (data) => {
    handleResetPasswordToken(data);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-lg space-y-8">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {userEmail ? 'Check email' : 'Reset your password'}
          </h2>

          <p className="text-richBlack-200 text-sm sm:text-base leading-relaxed">
            {userEmail
              ? `We have sent the reset email to ${userEmail}`
              : "Have no fear. We'll email you instructions to reset your password. if you don't have access to your email we can try account recovery"}
          </p>
        </div>

        {userEmail ? (
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => handleResetPasswordToken({ email: userEmail })}
            className="w-full h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-medium text-base rounded-md"
          >
            {isPending ? 'Resending...' : 'Resend email'}
          </Button>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email Address"
              name="email"
              placeholder="Enter email address"
              register={register}
              error={errors.email}
            />

            {/* Button */}
            <Button
              type="submit"
              disabled={!emailValue || isPending}
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

export default ForgotPassword;
