import { db } from '../config/db';
import { NewTrendingSkill, trendingSkills } from './schema';
import { sql } from 'drizzle-orm';

type JobTemplate = {
  name: string;
  baseScore: number;
  growth: number;
  demand: number;
};

const jobsTemplate: JobTemplate[] = [
  { name: 'AI / Machine Learning Engineer', baseScore: 100, growth: 96, demand: 92 },
  { name: 'Cloud Engineer', baseScore: 90, growth: 89, demand: 86 },
  { name: 'Cybersecurity Specialist', baseScore: 80, growth: 84, demand: 85 },
  { name: 'IT Auditor & Governance Specialist', baseScore: 75, growth: 80, demand: 82 },
  { name: 'Data Analyst / Business Intelligence', baseScore: 70, growth: 78, demand: 80 },
  { name: 'DevOps Engineer', baseScore: 65, growth: 75, demand: 76 },
  { name: 'UI/UX Designer', baseScore: 60, growth: 72, demand: 75 },
  { name: 'Mobile Developer', baseScore: 55, growth: 68, demand: 70 },
  { name: 'Backend Engineer', baseScore: 50, growth: 65, demand: 68 },
  { name: 'Frontend Developer', baseScore: 45, growth: 62, demand: 64 },
];

const years = [2023, 2024, 2025, 2026];

const getPopularityScore = (job: JobTemplate, year: number): number => {
  if (job.name === 'AI / Machine Learning Engineer') {
    const aiScores: Record<number, number> = {
      2023: 75,
      2024: 88,
      2025: 96,
      2026: 100,
    };

    return aiScores[year];
  }

  const historicalAdjustment = (2026 - year) * 2;
  return Math.max(30, job.baseScore - historicalAdjustment);
};

export const buildTrendingSkillsSeedData = (): NewTrendingSkill[] =>
  years.flatMap((year) =>
    jobsTemplate.map((job) => ({
      skillName: job.name,
      year,
      popularityScore: getPopularityScore(job, year),
      growth: Math.max(30, job.growth - (2026 - year)),
      demand: Math.max(30, job.demand - (2026 - year)),
    })),
  );

export const resetTrendingSkillsTable = async (): Promise<void> => {
  try {
    await db.execute(sql`TRUNCATE TABLE trending_skills RESTART IDENTITY CASCADE;`);
  } catch {
    await db.delete(trendingSkills);
    console.log('[WARN] TRUNCATE gagal, menggunakan DELETE sebagai fallback.');
  }
};

export const seedTrendingSkills = async (): Promise<void> => {
  const seedData = buildTrendingSkillsSeedData();

  console.log('[CLEANUP] Mengosongkan tabel trending_skills...');
  await resetTrendingSkillsTable();

  console.log(`[SEED] Memasukkan ${seedData.length} data master Trending Skills (2023 - 2026)...`);
  await db.insert(trendingSkills).values(seedData);

  console.log('[SUCCESS] Seeding selesai. Data trending_skills bersih, urut, dan bebas duplikasi.');
};
