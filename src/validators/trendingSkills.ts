import { z } from 'zod';

export const yearQuerySchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, 'Year harus berupa 4 digit angka')
    .transform(Number),
});

export type YearQuery = z.infer<typeof yearQuerySchema>;
