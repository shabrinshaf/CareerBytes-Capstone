import db from '../config/db';
import { trendingSkills } from './schema';

const seedData = [
  // 2023
  { skillName: 'JavaScript', year: 2023, popularityScore: 95 },
  { skillName: 'Python', year: 2023, popularityScore: 92 },
  { skillName: 'React', year: 2023, popularityScore: 88 },
  { skillName: 'Node.js', year: 2023, popularityScore: 85 },
  { skillName: 'TypeScript', year: 2023, popularityScore: 80 },
  { skillName: 'Docker', year: 2023, popularityScore: 75 },
  { skillName: 'AWS', year: 2023, popularityScore: 72 },
  { skillName: 'SQL', year: 2023, popularityScore: 70 },
  { skillName: 'Git', year: 2023, popularityScore: 68 },
  { skillName: 'Kubernetes', year: 2023, popularityScore: 60 },

  // 2024
  { skillName: 'Python', year: 2024, popularityScore: 97 },
  { skillName: 'AI/ML', year: 2024, popularityScore: 95 },
  { skillName: 'TypeScript', year: 2024, popularityScore: 91 },
  { skillName: 'React', year: 2024, popularityScore: 89 },
  { skillName: 'Next.js', year: 2024, popularityScore: 85 },
  { skillName: 'Docker', year: 2024, popularityScore: 82 },
  { skillName: 'Kubernetes', year: 2024, popularityScore: 78 },
  { skillName: 'AWS', year: 2024, popularityScore: 76 },
  { skillName: 'GraphQL', year: 2024, popularityScore: 70 },
  { skillName: 'Rust', year: 2024, popularityScore: 65 },

  // 2025
  { skillName: 'AI/ML', year: 2025, popularityScore: 99 },
  { skillName: 'Python', year: 2025, popularityScore: 96 },
  { skillName: 'TypeScript', year: 2025, popularityScore: 93 },
  { skillName: 'Rust', year: 2025, popularityScore: 88 },
  { skillName: 'Next.js', year: 2025, popularityScore: 85 },
  { skillName: 'Kubernetes', year: 2025, popularityScore: 83 },
  { skillName: 'Go', year: 2025, popularityScore: 79 },
  { skillName: 'WebAssembly', year: 2025, popularityScore: 74 },
  { skillName: 'Edge Computing', year: 2025, popularityScore: 70 },
  { skillName: 'Blockchain', year: 2025, popularityScore: 65 },
];

const seed = async () => {
  console.log('Seeding trending skills...');
  await db.insert(trendingSkills).values(seedData);
  console.log('Seed berhasil!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
