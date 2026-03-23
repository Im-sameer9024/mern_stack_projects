import { z } from 'zod';
import { availableCourseStatus } from '../utils/constants.js';
const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
export const CreateCourseValidator = z.object({
  title: z.string().min(3, 'Title is required'),

  description: z.string().min(10, 'Description is required'),

  whatYouWillLearn: z.preprocess(toArray, z.array(z.string()).max(10, 'Maximum 10 items allowed')),

  price: z.coerce.number(),

  category: z.string(),

  status: z.enum(availableCourseStatus).optional(),

  tag: z.preprocess(toArray, z.array(z.string()).max(5, 'Maximum 5 tags allowed')),

  instructions: z.preprocess(toArray, z.array(z.string()).max(7, 'Maximum 7 instructions allowed')),
});

export const UpdateCourseValidator = z.object({
  courseId: z.string(),
  title: z.string().min(3, 'Title is required'),

  description: z.string().min(10, 'Description is required'),

  whatYouWillLearn: z.preprocess(toArray, z.array(z.string()).max(10, 'Maximum 10 items allowed')),

  price: z.coerce.number(),

  category: z.string(),

  status: z.enum(availableCourseStatus).optional(),

  tag: z.preprocess(toArray, z.array(z.string()).max(5, 'Maximum 5 tags allowed')),

  instructions: z.preprocess(toArray, z.array(z.string()).max(7, 'Maximum 7 instructions allowed')),
});
