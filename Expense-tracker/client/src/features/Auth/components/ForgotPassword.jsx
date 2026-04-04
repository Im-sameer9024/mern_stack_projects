import InputField from '@/shared/components/custom/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordEmailValidationSchema } from '../validation/auth.validationSchema';
import CustomButton from '@/shared/components/custom/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordLink } from '../hooks/useAuth';

const ForgotPassword = () => {
  const [showEmailForm, setShowEmailForm] = useState(true);
  const navigate = useNavigate();

  const { mutateAsync: ResetPasswordLink, isPending: isResetPasswordLinkLoading } =
    useResetPasswordLink();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgotPasswordEmailValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    await ResetPasswordLink(data);
    setShowEmailForm(false);
  };

  const GoToLogin = () => {
    navigate('/login');
    setShowEmailForm(true);
  };

  return (
    <>
      {showEmailForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
          <InputField
            label={'Email'}
            placeholder="abc123@gmail.com"
            type={'email'}
            name={'email'}
            error={errors.email}
            loading={isResetPasswordLinkLoading}
            control={control}
          />
          <CustomButton
            fullWidth={true}
            type="submit"
            active={true}
            loading={isResetPasswordLinkLoading}
          >
            Forgot Password
          </CustomButton>
        </form>
      ) : (
        <div className=" space-y-2">
          <p className=" text-center">
            Reset Password Link has been sent to your email. Please chek your email and update your
            password ?
          </p>
          <CustomButton
            onClick={GoToLogin}
            fullWidth={true}
            type="submit"
            active={true}
            loading={false}
          >
            Back To Login
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
