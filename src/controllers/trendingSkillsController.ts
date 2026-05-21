import { Request, Response } from 'express';
import { db } from '../config/db';
import { trendingSkills } from '../db/schema';
import { desc, eq } from 'drizzle-orm'; // Tambahkan 'eq' di sini untuk perbandingan data

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

export const getTrendingSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Ambil query parameter 'year' dari request URL
    const { year } = req.query;

    // 2. Buat instance query dasar Drizzle
    let query = db
      .select()
      .from(trendingSkills);

    // 3. Jika user mengirimkan query parameter ?year=..., lakukan filter secara dinamis
    if (year) {
      const targetYear = Number(year);
      
      // Validasi tipis agar aman dari input aneh yang bukan angka
      if (!isNaN(targetYear)) {
        // Drizzle menggunakan sintaks .where(eq(kolom, nilai))
        query = query.where(eq(trendingSkills.year, targetYear)) as any;
      }
    }

    // 4. Jalankan query dengan sorting default (Skor popularitas tertinggi di atas)
    const data = await query.orderBy(desc(trendingSkills.year), desc(trendingSkills.popularityScore));

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: unknown) {
    logControllerError('Gagal mengambil data trending skills', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUniqueJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Mengambil nama pekerjaan yang unik saja dari database menggunakan Drizzle selectDistinct
    const jobs = await db
      .selectDistinct({ skillName: trendingSkills.skillName })
      .from(trendingSkills);

    res.status(200).json({
      status: 'success',
      data: jobs.map((j) => j.skillName), // Mengembalikan array berisi 10 nama string bersih
    });
  } catch (error: unknown) {
    logControllerError('Gagal mengambil daftar pekerjaan unik', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};