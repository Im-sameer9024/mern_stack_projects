/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormSchema } from '../validation/Signup.validation';
import { useSendOtp } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice';
import { motion } from 'motion/react';
import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      role: 'student',
    },
  });

  const dispatch = useDispatch();
  const role = watch('role');
  const { mutate: SendOtp, isPending } = useSendOtp();

  const onSubmit = (data) => {
    SendOtp({ email: data.email });
    dispatch(setUser(data));
  };

  return (
    <>
      {/* -------------------- Role Toggle----------------- */}
      <div className="relative flex bg-richBlack-800 p-1 rounded-full w-fit overflow-hidden">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute top-1 bottom-1 w-1/2 rounded-full bg-richBlack-900"
          style={{
            left: role === 'student' ? '4px' : 'calc(50% - 4px)',
          }}
        />

        <button
          type="button"
          onClick={() => setValue('role', 'student')}
          className={`relative z-10 px-5 py-1 text-sm hover:cursor-pointer ${
            role === 'student' ? 'text-white' : 'text-richBlack-300'
          }`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => setValue('role', 'teacher')}
          className={`relative z-10 px-5 py-1 text-sm hover:cursor-pointer ${
            role === 'teacher' ? 'text-white' : 'text-richBlack-300'
          }`}
        >
          Instructors
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('role')} />

        {/*----------------- Name Row---------------- */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            register={register}
            error={errors.firstName}
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            register={register}
            error={errors.lastName}
          />
        </div>

        {/*-------------------- email input--------------  */}
        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter email address"
          register={register}
          error={errors.email}
        />

        {/*------------------- phone number -------------------- */}
        <InputField
          label="Phone Number"
          name="contactNumber"
          type="tel"
          placeholder="12345 67890"
          register={register}
          error={errors.contactNumber}
        />

        {/*------------ Password Row------------ */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            register={register}
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Enter password"
            register={register}
            error={errors.confirmPassword}
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
        >
          {isPending ? 'Creating....' : 'Create Account'}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
