import { z } from 'zod';

export const submitTaskSchema = z.object({
  figmaLink: z
    .string()
    .url('figmaLink harus berupa URL valid')
    .optional()
    .or(z.literal('')),
  fileUrl: z
    .string()
    .url('fileUrl harus berupa URL valid')
    .optional()
    .or(z.literal('')),
  answer1: z.string().min(10, 'Jawaban 1 minimal 10 karakter'),
  answer2: z.string().min(10, 'Jawaban 2 minimal 10 karakter'),
  answer3: z.string().min(10, 'Jawaban 3 minimal 10 karakter'),
}).refine(
  (data) => !!data.figmaLink || !!data.fileUrl,
  { message: 'Wajib menyertakan Figma link atau upload file' },
);

export const saveDraftSchema = z.object({
  figmaLink: z.string().optional(),
  fileUrl: z.string().optional(),
  answer1: z.string().optional(),
  answer2: z.string().optional(),
  answer3: z.string().optional(),
});
