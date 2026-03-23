/* eslint-disable react-hooks/incompatible-library */
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSendOtp, useSignupUser } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { otpSchema } from '../validation/Signup.validation';
import { Link } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';

const EmailVerifyPage = () => {
  const { handleSubmit, control, watch } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { user } = useSelector((state) => state.user);
  const otpValue = watch('otp');

  const { mutate: SignupUser, isPending } = useSignupUser();
  const { mutate: SendOtp, isPending: otpPending } = useSendOtp();

  const handleResendOtp = () => {
    if (!user.email) {
      toast.error('Email not found');
      return;
    }
    SendOtp({ email: user.email });
  };

  const onSubmit = (data) => {
    const finalData = {
      ...user,
      otp: data.otp,
    };
    SignupUser(finalData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-lg space-y-8">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold">Verify email</h2>

          <p className="text-richBlack-200 text-sm sm:text-base leading-relaxed">
            A verification code has been sent to you{' '}
            <span className=" text-sky-400 underline">{user?.email}</span> . Enter the code below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* OTP */}
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-lg border border-richBlack-600 bg-richBlack-800 rounded-md focus:border-yellow-400"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={!otpValue || otpValue.length < 6 || isPending || otpPending}
            className="w-full h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-medium text-base rounded-md"
          >
            {isPending ? 'Verifying...' : 'Verify and Register'}
          </Button>
        </form>

        {/* Footer Actions */}
        <div className="flex justify-between items-center text-sm text-richBlack-200">
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-white transition hover:underline underline-offset-2"
          >
            ← Back to login
          </Link>

          <Button
            variant="link"
            onClick={handleResendOtp}
            className="flex items-center gap-1 hover:text-yellow-400 transition text-white hover:cursor-pointer"
          >
            <RotateCcw size={14} />
            {otpPending ? 'Sending...' : 'Resend OTP'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailVerifyPage;
