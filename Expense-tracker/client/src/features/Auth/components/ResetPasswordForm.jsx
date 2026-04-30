import CustomButton from '@/shared/components/custom/CustomButton';
import InputField from '@/shared/components/custom/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { resetPasswordValidationSchema } from '../validation/auth.validationSchema';

const ResetPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { token } = useParams();
  const { mutate: UpdatePassword, isPending: isUpdatePasswordPending } = useResetPassword();

  const OnSubmitHandler = async (data) => {
    const finalData = {
      token: token,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };

    UpdatePassword(finalData);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmitHandler)} className=" space-y-3">
      {/*------------------- Password  --------------  */}

      <InputField
        label={'New Password'}
        placeholder={'john@123'}
        type={'password'}
        name={'newPassword'}
        error={errors.newPassword}
        loading={isUpdatePasswordPending}
        control={control}
      />

      {/*------------------- Confirm Password  --------------  */}

      <InputField
        label={'Confirm Password'}
        placeholder={'john@123'}
        type={'password'}
        name={'confirmPassword'}
        error={errors.confirmPassword}
        loading={isUpdatePasswordPending}
        control={control}
      />

      <CustomButton fullWidth={true} type="submit" active={true} loading={isUpdatePasswordPending}>
        Update Password
      </CustomButton>
    </form>
  );
};

export default ResetPasswordForm;
