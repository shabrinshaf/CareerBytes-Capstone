import { eq, ilike, desc } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../config/db';
import { roadmapLevels, roles, users } from '../db/schema';
import {
  roleQuerySchema,
  searchQuerySchema,
  selectRoleSchema,
} from '../validators/careerRoadmap';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getRoadmapByRoleId = async (roleId: number) => {
  const levels = await db
    .select()
    .from(roadmapLevels)
    .where(eq(roadmapLevels.roleId, roleId))
    .orderBy(roadmapLevels.order);

  return levels;
};

const formatRoadmapResponse = (
  role: typeof roles.$inferSelect,
  levels: (typeof roadmapLevels.$inferSelect)[],
) => ({
  id: role.id,
  name: role.name,
  description: role.description,
  careerLevel: role.careerLevel,
  estimateYears: role.estimateYears,
  levels: levels.map((l) => ({
    id: l.id,
    level: l.level,
    levelLabel: l.levelLabel,
    description: l.description,
    skills: l.skills,
    tools: l.tools,
    order: l.order,
  })),
});

// ─── GET /api/career-roadmap?role=<name> ─────────────────────────────────────

export const getRoadmapByRole = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = roleQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        message: parsed.error.issues[0]?.message ?? 'Invalid query',
      });
      return;
    }

    const { role } = parsed.data;

    const [roleData] = await db
      .select()
      .from(roles)
      .where(ilike(roles.name, role)); // case-insensitive search

    if (!roleData) {
      // Fallback: ambil 5 popular roles sebagai rekomendasi
      const suggestions = await db
        .select({ id: roles.id, name: roles.name })
        .from(roles)
        .where(eq(roles.isPopular, true))
        .limit(5);

      res.status(404).json({
        message: `Career roadmap untuk "${role}" tidak ditemukan`,
        suggestions: suggestions.map((s) => s.name),
      });
      return;
    }

    const levels = await getRoadmapByRoleId(roleData.id);

    res.json({
      message: 'Success',
      data: formatRoadmapResponse(roleData, levels),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/career-roadmap/default ─────────────────────────────────────────

export const getDefaultRoadmap = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;

    const [user] = await db
      .select({ roleId: users.roleId })
      .from(users)
      .where(eq(users.id, userId));

    if (!user?.roleId) {
      res.status(404).json({
        message: 'Kamu belum memilih role karier. Pilih role terlebih dahulu.',
      });
      return;
    }

    const [roleData] = await db
      .select()
      .from(roles)
      .where(eq(roles.id, user.roleId));

    if (!roleData) {
      res.status(404).json({ message: 'Role tidak ditemukan' });
      return;
    }

    const levels = await getRoadmapByRoleId(roleData.id);

    res.json({
      message: 'Success',
      data: formatRoadmapResponse(roleData, levels),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/roles?query=<keyword> ──────────────────────────────────────────

export const searchRoles = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = searchQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        message: parsed.error.issues[0]?.message ?? 'Invalid query',
      });
      return;
    }

    const { query } = parsed.data;

    const results = await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        careerLevel: roles.careerLevel,
        estimateYears: roles.estimateYears,
        isPopular: roles.isPopular,
      })
      .from(roles)
      .where(ilike(roles.name, `%${query}%`))
      .limit(10);

    if (results.length === 0) {
      // Kembalikan suggested roles kalau tidak ada hasil
      const suggestions = await db
        .select({ id: roles.id, name: roles.name })
        .from(roles)
        .where(eq(roles.isPopular, true))
        .limit(5);

      res.status(404).json({
        message: `Tidak ada role yang cocok dengan "${query}"`,
        suggestions: suggestions.map((s) => s.name),
      });
      return;
    }

    res.json({
      message: 'Success',
      total: results.length,
      data: results,
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/roles/popular ───────────────────────────────────────────────────

export const getPopularRoles = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const popularRoles = await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        careerLevel: roles.careerLevel,
        estimateYears: roles.estimateYears,
      })
      .from(roles)
      .where(eq(roles.isPopular, true))
      .orderBy(desc(roles.createdAt));

    res.json({
      message: 'Success',
      total: popularRoles.length,
      data: popularRoles,
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── PATCH /api/auth/me/role ──────────────────────────────────────────────────

export const selectUserRole = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = selectRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: parsed.error.issues[0]?.message ?? 'Invalid input',
      });
      return;
    }

    const { roleId } = parsed.data;
    const userId = (req.user as { id: number }).id;

    // Pastikan roleId valid
    const [roleData] = await db
      .select({ id: roles.id, name: roles.name })
      .from(roles)
      .where(eq(roles.id, roleId));

    if (!roleData) {
      res.status(404).json({ message: 'Role tidak ditemukan' });
      return;
    }

    await db.update(users).set({ roleId }).where(eq(users.id, userId));

    res.json({
      message: `Role berhasil dipilih: ${roleData.name}`,
      data: { roleId: roleData.id, roleName: roleData.name },
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};
