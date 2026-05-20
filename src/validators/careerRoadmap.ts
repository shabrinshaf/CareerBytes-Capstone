import { z } from 'zod';

export const roleQuerySchema = z.object({
  role: z.string().min(1, 'Role wajib diisi'),
});

export const searchQuerySchema = z.object({
  query: z.string().min(1, 'Query wajib diisi'),
});

export const selectRoleSchema = z.object({
  roleId: z.number({ message: 'roleId wajib diisi dan harus berupa angka' }),
});
