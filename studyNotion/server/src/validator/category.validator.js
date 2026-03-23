import z from 'zod';

const CategoryDataValidator = z.object({
  name: z.string().min(1).max(20),
  description: z.string().min(1).max(200),
});

const GetSingleCategoryDataValidator = z.object({});

export { CategoryDataValidator };
