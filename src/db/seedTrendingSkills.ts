import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { seedTrendingSkills } from './trendingSkillsSeedData';

async function main(): Promise<void> {
  await seedTrendingSkills();
  process.exit(0);
}

main().catch((error: unknown) => {
  console.error('[ERROR] Proses seeding gagal:', error);
  process.exit(1);
});
