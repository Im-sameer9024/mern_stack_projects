import { z } from 'zod';

export const SignupFormSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    contactNumber: z
      .string()
      .min(10, 'Phone number is almost 10 number')
      .max(10, 'Phone number is too long'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['student', 'teacher']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const EmailSchema = z.object({
  email: z.email(),
});

export const otpSchema = z.object({
  otp: z.string(),
});
