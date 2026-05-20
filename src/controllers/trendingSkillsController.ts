import { desc, eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../config/db';
import { trendingSkills } from '../db/schema';
import { yearQuerySchema } from '../validators/trendingSkills';

// GET /api/trending-skills/periods
export const getPeriods = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const periods = await db
      .selectDistinct({ year: trendingSkills.year })
      .from(trendingSkills)
      .orderBy(desc(trendingSkills.year));

    res.json({
      message: 'Success',
      data: periods.map((p) => p.year),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/trending-skills?year=2025
export const getSkillsByYear = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = yearQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      const errorMessage = parsed.error.issues[0]?.message ?? 'Invalid query';
      res.status(400).json({ message: errorMessage });
      return;
    }

    const { year } = parsed.data;

    const skills = await db
      .select()
      .from(trendingSkills)
      .where(eq(trendingSkills.year, year))
      .orderBy(desc(trendingSkills.popularityScore));

    if (skills.length === 0) {
      res
        .status(404)
        .json({ message: `Data untuk tahun ${year} tidak ditemukan` });
      return;
    }

    res.json({ message: 'Success', year, data: skills });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};
