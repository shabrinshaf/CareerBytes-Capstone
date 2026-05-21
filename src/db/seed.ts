import { db } from '../config/db';
import { NewTrendingSkill, trendingSkills } from './schema';
import 'dotenv/config';

const seedData: NewTrendingSkill[] = [
  // 2023
  { skillName: 'AI/Machine Learning', year: 2023, popularityScore: 95, growth: 88, demand: 92 },
  { skillName: 'Cloud Computing', year: 2023, popularityScore: 92, growth: 85, demand: 90 },
  { skillName: 'Cybersecurity', year: 2023, popularityScore: 88, growth: 82, demand: 87 },
  { skillName: 'Data Science', year: 2023, popularityScore: 85, growth: 80, demand: 83 },
  { skillName: 'UI/UX Design', year: 2023, popularityScore: 80, growth: 75, demand: 78 },
  { skillName: 'DevOps', year: 2023, popularityScore: 78, growth: 72, demand: 76 },
  { skillName: 'Mobile Development', year: 2023, popularityScore: 75, growth: 68, demand: 73 },
  { skillName: 'Frontend Developer', year: 2023, popularityScore: 72, growth: 65, demand: 70 },
  { skillName: 'Backend Developer', year: 2023, popularityScore: 70, growth: 62, demand: 68 },
  { skillName: 'Product Manager', year: 2023, popularityScore: 65, growth: 58, demand: 63 },

  // 2024
  { skillName: 'AI/Machine Learning', year: 2024, popularityScore: 97, growth: 92, demand: 95 },
  { skillName: 'Cybersecurity', year: 2024, popularityScore: 94, growth: 90, demand: 93 },
  { skillName: 'Cloud Computing', year: 2024, popularityScore: 91, growth: 87, demand: 89 },
  { skillName: 'Data Science', year: 2024, popularityScore: 88, growth: 84, demand: 86 },
  { skillName: 'DevOps', year: 2024, popularityScore: 85, growth: 80, demand: 82 },
  { skillName: 'UI/UX Design', year: 2024, popularityScore: 82, growth: 77, demand: 79 },
  { skillName: 'Backend Developer', year: 2024, popularityScore: 78, growth: 73, demand: 76 },
  { skillName: 'Mobile Development', year: 2024, popularityScore: 76, growth: 70, demand: 74 },
  { skillName: 'Frontend Developer', year: 2024, popularityScore: 74, growth: 68, demand: 72 },
  { skillName: 'Product Manager', year: 2024, popularityScore: 70, growth: 64, demand: 68 },

  // 2025
  { skillName: 'AI/Machine Learning', year: 2025, popularityScore: 99, growth: 95, demand: 97 },
  { skillName: 'Cybersecurity', year: 2025, popularityScore: 97, growth: 93, demand: 95 },
  { skillName: 'Cloud Computing', year: 2025, popularityScore: 94, growth: 90, demand: 92 },
  { skillName: 'Data Science', year: 2025, popularityScore: 91, growth: 87, demand: 89 },
  { skillName: 'DevOps', year: 2025, popularityScore: 88, growth: 83, demand: 85 },
  { skillName: 'UI/UX Design', year: 2025, popularityScore: 85, growth: 80, demand: 82 },
  { skillName: 'Backend Developer', year: 2025, popularityScore: 82, growth: 77, demand: 79 },
  { skillName: 'Mobile Development', year: 2025, popularityScore: 79, growth: 73, demand: 76 },
  { skillName: 'Frontend Developer', year: 2025, popularityScore: 76, growth: 70, demand: 73 },
  { skillName: 'Product Manager', year: 2025, popularityScore: 73, growth: 66, demand: 70 },
];

const seed = async () => {
  console.log('Seeding data...');
  await db.insert(trendingSkills).values(seedData);
  console.log('Seed berhasil!');
  process.exit(0);
};

seed().catch((err: unknown) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
