import z from 'zod';

const subSectionDataValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(50, { message: 'Title must be at most 50 characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .max(200, { message: 'Description must be at most 50 characters long' }),
  sectionId: z.string({ message: 'sectionId is required' }),
});

const subSectionDataUpdateValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(50, { message: 'Title must be at most 50 characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .max(200, { message: 'Description must be at most 50 characters long' }),
  subSectionId: z.string({ message: 'subSectionId is required' }),
});

export { subSectionDataValidator,subSectionDataUpdateValidator };
