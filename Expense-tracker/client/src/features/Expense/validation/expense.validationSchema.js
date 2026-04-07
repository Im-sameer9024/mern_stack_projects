import z from 'zod';

const AddExpenseValidationSchema = z.object({
  source: z
    .string()
    .min(1, { message: 'Source is required' })
    .max(15, {
      message: 'Source must be less than 15 characters',
    })
    .trim(),

  amount: z.coerce
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive({ message: 'Amount must be greater than 0' }),

  date: z
    .string({
      required_error: 'Date is required',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
});

const UpdateExpenseValidationSchema = z.object({
  source: z
    .string()
    .min(1, { message: 'Source is required' })
    .max(15, {
      message: 'Source must be less than 15 characters',
    })
    .trim(),

  amount: z.coerce
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive({ message: 'Amount must be greater than 0' }),

  date: z
    .string({
      required_error: 'Date is required',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
});

export { AddExpenseValidationSchema, UpdateExpenseValidationSchema };
