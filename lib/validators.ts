import { z } from 'zod';

export const feedbackIn = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name too long'),
  body: z.string().trim().min(1, 'Description is required').max(2000, 'Description too long'),
});

export const feedbackUpdate = z.object({
  display_name: z.string().trim().min(1).max(50).optional(),
  body: z.string().trim().min(1).max(2000).optional(),
});

export const loginIn = z.object({
  password: z.string().min(1),
});
