import z from 'zod';

const ResetPasswordDataValidator = z
  .object({
    token: z.string(),
    newPassword: z
      .string()
      .min(6, { message: 'Old password should be at least 6 characters' })
      .max(20, { message: 'Old password should be less than 20 characters' }),
    confirmNewPassword: z
      .string()
      .min(6, { message: 'New password should be at least 6 characters' })
      .max(20, { message: 'New password should be less than 20 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export { ResetPasswordDataValidator };
