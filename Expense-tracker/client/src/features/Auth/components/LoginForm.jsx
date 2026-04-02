import CustomButton from '@/shared/components/custom/CustomButton';
import InputField from '@/shared/components/custom/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginTest, LoginValidationSchema } from '@/features/Auth/validation/auth.validationSchema';
import { useLoginUser } from '../hooks/useAuth';

const LoginForm = () => {
  const { mutateAsync: LoginUser, isPending: isLoginUserLoading } = useLoginUser();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginTest),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const OnSubmitHandler = async (data) => {
    await LoginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmitHandler)} className=" space-y-2">
      {/*-------------- Email field ------------------- */}
      <InputField
        label={'Email Address'}
        placeholder={'john123@gmail.com'}
        type={'text'}
        name={'email'}
        error={errors.email}
        loading={isLoginUserLoading}
        control={control}
      />

      {/*------------------- Password field --------------  */}

      <InputField
        label={'Password'}
        placeholder="Password"
        type={'password'}
        name={'password'}
        error={errors.password}
        loading={isLoginUserLoading}
        control={control}
      />

      <CustomButton fullWidth={true} type="submit" active={true} loading={isLoginUserLoading}>
        Log In
      </CustomButton>
    </form>
  );
};

export default LoginForm;
