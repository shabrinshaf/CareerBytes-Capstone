import { z } from 'zod';

export const submitAnswerSchema = z.object({
  roleId: z.number({ message: 'roleId wajib diisi' }),
  answers: z
    .array(
      z
        .object({
          questionId: z.number(),
          score: z.number().min(1).max(5).optional(),
          essayAnswer: z.string().min(100).optional(),
        })
        .refine(
          (data) => data.score !== undefined || data.essayAnswer !== undefined,
          { message: 'Harus isi score (rating) atau essayAnswer (essay)' },
        ),
    )
    .min(1, 'Minimal 1 jawaban'),
});

export const roleQuerySchema = z.object({
  role: z.string().min(1, 'Role wajib diisi'),
});
