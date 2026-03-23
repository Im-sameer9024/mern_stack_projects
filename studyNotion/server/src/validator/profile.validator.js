import z from 'zod';
import { availableGender } from '../utils/constants.js';

export const ProfileDataValidator = z.object({
  gender: z.enum(availableGender),
  dateOfBirth: z.string(),
  about: z
    .string()
    .min(10, { message: 'about must be at least 10 characters long' })
    .max(100, { message: 'about must be at most 100 characters long' }),
  contactNumber: z
    .string()
    .min(10, { message: 'contact number must be at least 10 characters long' })
    .max(10, { message: 'contact number must be at most 10 characters long' }),
});
