import CustomButton from '@/shared/components/custom/CustomButton';
import InputField from '@/shared/components/custom/InputField';
import {
  SignupTest,
  SignupValidationSchema,
} from '@/features/Auth/validation/auth.validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignupUser } from '../hooks/useAuth';

const SignupForm = () => {
  const { mutateAsync: SignupUser, isPending: isLoadingSignupUser } = useSignupUser();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SignupTest),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const OnSubmitHandler = async (data) => {
    await SignupUser(data);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmitHandler)} className=" space-y-2">
      {/*-------------- Email field ------------------- */}
      <InputField
        label={'Full Name'}
        placeholder={'John Doe'}
        type={'text'}
        name={'name'}
        error={errors.name}
        loading={isLoadingSignupUser}
        control={control}
      />
      {/*-------------- Email field ------------------- */}
      <InputField
        label={'Email Address'}
        placeholder={'john123@gmail.com'}
        type={'text'}
        name={'email'}
        error={errors.email}
        loading={isLoadingSignupUser}
        control={control}
      />

      {/*------------------- Password field --------------  */}

      <InputField
        label={'Password'}
        placeholder="Password"
        type={'password'}
        name={'password'}
        error={errors.password}
        loading={isLoadingSignupUser}
        control={control}
      />

      <CustomButton fullWidth={true} type="submit" active={true} loading={isLoadingSignupUser}>
        Sign Up
      </CustomButton>
    </form>
  );
};

export default SignupForm;
