import { z } from 'zod';

export const submitAnswerSchema = z.object({
  roleId: z.number({ message: 'roleId wajib diisi' }),
  answers: z.array(
    z.object({
      questionId: z.number(),
      selectedOption: z.number().min(0).max(3),
    })
  ).min(1, 'Minimal 1 jawaban'),
});

export const roleQuerySchema = z.object({
  role: z.string().min(1, 'Role wajib diisi'),
});
