import z from 'zod';

const RatingReviewDataValidator = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(3).max(200),
  courseId: z.string(),
});

export default RatingReviewDataValidator;
