import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../validation/Login.validation';
import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';
import { useLoginUser } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const { mutate: LoginUser, isPending } = useLoginUser();

  const onSubmit = (data) => {
    LoginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label={'Email Address'}
        type={'email'}
        name={'email'}
        placeholder={'Enter email address'}
        register={register}
        error={errors.email}
      />
      <div className="space-y-1">
        <InputField
          label={'Password'}
          name={'password'}
          type={'password'}
          placeholder={'Enter Password'}
          register={register}
          error={errors.password}
        />
        <div className="text-right text-xs text-blue-400 cursor-pointer hover:underline mt-4">
          <Link to={'/forgot-password'}>Forgot password</Link>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
      >
        {isPending ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
