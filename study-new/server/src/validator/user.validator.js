import z from 'zod';
import { availableRole } from '../utils/constants.js';

const EmailValidator = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const SignupDataValidator = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, { message: 'First name must be at least 3 characters' })
      .max(20, { message: 'First name should be less than 20 characters' }),

    lastName: z
      .string()
      .trim()
      .min(3, { message: 'Last name must be at least 3 characters' })
      .max(20, { message: 'Last name should be less than 20 characters' }),

    email: z.string().email({ message: 'Invalid email address' }),

    password: z
      .string()
      .min(6, { message: 'Password should be at least 6 characters' })
      .max(20, { message: 'Password should be less than 20 characters' }),

    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password should be at least 6 characters' })
      .max(20, { message: 'Confirm password should be less than 20 characters' }),

    role: z.enum(availableRole, { message: 'Invalid role' }),

    otp: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
    contactNumber: z.string().regex(/^\d{10}$/, 'Contact number must be 10 digits'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const LoginDataValidator = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password should be at least 6 characters' })
    .max(20, { message: 'Password should be less than 20 characters' }),
});

const ChangePasswordDataValidator = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Old password should be at least 6 characters' })
      .max(20, { message: 'Old password should be less than 20 characters' }),

    newPassword: z
      .string()
      .min(6, { message: 'New password should be at least 6 characters' })
      .max(20, { message: 'New password should be less than 20 characters' }),

    confirmNewPassword: z
      .string()
      .min(6, { message: 'Confirm password should be at least 6 characters' })
      .max(20, { message: 'Confirm password should be less than 20 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export { EmailValidator, SignupDataValidator, LoginDataValidator, ChangePasswordDataValidator };
