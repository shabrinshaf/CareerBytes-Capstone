import 'dotenv/config';
import { seedTrendingSkills } from './trendingSkillsSeedData';

const seed = async (): Promise<void> => {
  await seedTrendingSkills();
  process.exit(0);
};

seed().catch((err: unknown) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
