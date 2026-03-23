import { z } from 'zod';

export const GetInTouchFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[A-Za-z\s]+$/, 'First name can only contain letters'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[A-Za-z\s]+$/, 'Last name can only contain letters'),

  email: z.string().email('Invalid email address'),

  countryCode: z.string().regex(/^\+\d{1,4}$/, 'Invalid country code'),

  contactNumber: z
    .string()
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\d+$/, 'Phone number must contain only digits'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters'),
});
