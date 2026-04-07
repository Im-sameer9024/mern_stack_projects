import CustomButton from '@/shared/components/custom/CustomButton';
import InputField from '@/shared/components/custom/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  LoginValidationSchema } from '@/features/Auth/validation/auth.validationSchema';
import { useLoginUser } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { mutateAsync: LoginUser, isPending: isLoginUserLoading,} = useLoginUser();


  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const OnSubmitHandler = async (data) => {
    await LoginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmitHandler)} className=" space-y-3">
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

      <p className=" text-xs text-blue-500 hover:text-blue-600 text-end">
        <Link to={'/forgot-password'} className=" hover:underline">
          Forgot Password
        </Link>
      </p>

      <CustomButton fullWidth={true} type="submit" active={true} loading={isLoginUserLoading}>
        Log In
      </CustomButton>
    </form>
  );
};

export default LoginForm;
