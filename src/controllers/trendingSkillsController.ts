import { Request, Response } from 'express';
import { db } from '../config/db';
import { trendingSkills } from '../db/schema';
import { desc } from 'drizzle-orm';

const logControllerError = (context: string, error: unknown): void => {
  console.error(`[TrendingSkills] ${context}:`, error);
};

export const getPeriods = async (_req: Request, res: Response): Promise<void> => {
  try {
    const periods = await db
      .selectDistinct({ year: trendingSkills.year })
      .from(trendingSkills)
      .orderBy(desc(trendingSkills.year));

    res.json({
      message: 'Success',
      data: periods.map((p) => p.year),
    });
  } catch (error: unknown) {
    logControllerError('Gagal mengambil daftar periode', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTrendingSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await db
      .select()
      .from(trendingSkills)
      .orderBy(desc(trendingSkills.year), desc(trendingSkills.popularityScore));

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: unknown) {
    logControllerError('Gagal mengambil data trending skills', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
