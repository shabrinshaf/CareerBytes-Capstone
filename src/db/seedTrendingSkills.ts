import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { db } from '../config/db';
import { NewTrendingSkill, trendingSkills } from './schema';
import { sql } from 'drizzle-orm';

async function seedTrendingSkillsDinamis(): Promise<void> {
  try {
    console.log('[CLEANUP] Mengosongkan tabel trending_skills via TRUNCATE...');
    await db.execute(sql`TRUNCATE TABLE trending_skills RESTART IDENTITY CASCADE;`);

    console.log('[SEED] Menyuntikkan data tren fluktuatif (2023 - 2026)...');

    const dataset: NewTrendingSkill[] = [
      // === TAHUN 2026 (AI & Cloud Paling Atas) ===
      { skillName: 'AI / Machine Learning Engineer', year: 2026, growth: 96, demand: 92, popularityScore: 100 },
      { skillName: 'Cloud Engineer', year: 2026, growth: 89, demand: 86, popularityScore: 90 },
      { skillName: 'Cybersecurity Specialist', year: 2026, growth: 84, demand: 85, popularityScore: 80 },
      { skillName: 'IT Auditor & Governance Specialist', year: 2026, growth: 80, demand: 82, popularityScore: 75 },
      { skillName: 'Data Analyst / Business Intelligence', year: 2026, growth: 78, demand: 80, popularityScore: 70 },
      { skillName: 'DevOps Engineer', year: 2026, growth: 75, demand: 76, popularityScore: 65 },
      { skillName: 'UI/UX Designer', year: 2026, growth: 72, demand: 75, popularityScore: 60 },
      { skillName: 'Mobile Developer', year: 2026, growth: 68, demand: 70, popularityScore: 55 },
      { skillName: 'Backend Engineer', year: 2026, growth: 65, demand: 68, popularityScore: 50 },
      { skillName: 'Frontend Developer', year: 2026, growth: 62, demand: 64, popularityScore: 45 },

      // === TAHUN 2025 (UI/UX & Frontend Meroket ke Atas) ===
      { skillName: 'UI/UX Designer', year: 2025, growth: 95, demand: 93, popularityScore: 98 },
      { skillName: 'Frontend Developer', year: 2025, growth: 91, demand: 89, popularityScore: 92 },
      { skillName: 'Mobile Developer', year: 2025, growth: 86, demand: 88, popularityScore: 85 },
      { skillName: 'Data Analyst / Business Intelligence', year: 2025, growth: 82, demand: 80, popularityScore: 78 },
      { skillName: 'AI / Machine Learning Engineer', year: 2025, growth: 75, demand: 78, popularityScore: 74 },
      { skillName: 'Backend Engineer', year: 2025, growth: 70, demand: 72, popularityScore: 68 },
      { skillName: 'Cloud Engineer', year: 2025, growth: 68, demand: 65, popularityScore: 62 },
      { skillName: 'Cybersecurity Specialist', year: 2025, growth: 64, demand: 66, popularityScore: 55 },
      { skillName: 'DevOps Engineer', year: 2025, growth: 60, demand: 61, popularityScore: 50 },
      { skillName: 'IT Auditor & Governance Specialist', year: 2025, growth: 55, demand: 58, popularityScore: 42 },

      // === TAHUN 2024 (Data, Security & Backend Berjaya) ===
      { skillName: 'Data Analyst / Business Intelligence', year: 2024, growth: 94, demand: 96, popularityScore: 97 },
      { skillName: 'Cybersecurity Specialist', year: 2024, growth: 90, demand: 88, popularityScore: 91 },
      { skillName: 'Backend Engineer', year: 2024, growth: 85, demand: 87, popularityScore: 86 },
      { skillName: 'DevOps Engineer', year: 2024, growth: 82, demand: 80, popularityScore: 80 },
      { skillName: 'Cloud Engineer', year: 2024, growth: 78, demand: 75, popularityScore: 72 },
      { skillName: 'IT Auditor & Governance Specialist', year: 2024, growth: 73, demand: 70, popularityScore: 66 },
      { skillName: 'AI / Machine Learning Engineer', year: 2024, growth: 68, demand: 65, popularityScore: 60 },
      { skillName: 'UI/UX Designer', year: 2024, growth: 62, demand: 64, popularityScore: 54 },
      { skillName: 'Mobile Developer', year: 2024, growth: 58, demand: 60, popularityScore: 48 },
      { skillName: 'Frontend Developer', year: 2024, growth: 52, demand: 55, popularityScore: 40 },

      // === TAHUN 2023 (Mobile & Infrastructure Mendominasi) ===
      { skillName: 'Mobile Developer', year: 2023, growth: 97, demand: 95, popularityScore: 99 },
      { skillName: 'Cloud Engineer', year: 2023, growth: 92, demand: 90, popularityScore: 93 },
      { skillName: 'DevOps Engineer', year: 2023, growth: 86, demand: 88, popularityScore: 87 },
      { skillName: 'Backend Engineer', year: 2023, growth: 81, demand: 83, popularityScore: 82 },
      { skillName: 'Frontend Developer', year: 2023, growth: 76, demand: 78, popularityScore: 74 },
      { skillName: 'UI/UX Designer', year: 2023, growth: 70, demand: 72, popularityScore: 67 },
      { skillName: 'Data Analyst / Business Intelligence', year: 2023, growth: 65, demand: 63, popularityScore: 60 },
      { skillName: 'Cybersecurity Specialist', year: 2023, growth: 60, demand: 58, popularityScore: 52 },
      { skillName: 'IT Auditor & Governance Specialist', year: 2023, growth: 55, demand: 52, popularityScore: 45 },
      { skillName: 'AI / Machine Learning Engineer', year: 2023, growth: 48, demand: 50, popularityScore: 38 },
    ];

    console.log(`[SEED] Melakukan bulk insert ${dataset.length} baris data tren terurut...`);
    await db.insert(trendingSkills).values(dataset);

    console.log('[SUCCESS] Fitur tren dinamis multi-tahun berhasil di-seed ulang!');
  } catch (error) {
    console.error('[ERROR] Proses seeding gagal:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedTrendingSkillsDinamis();
