import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import 'dotenv/config';

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: text('password'),
  googleId: varchar('google_id', { length: 255 }).unique(),
  githubId: varchar('github_id', { length: 255 }).unique(), // dari setup-eslint-drizzle
  avatar: text('avatar'), // URL ke foto profil
  roleId: integer('role_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Trending Skills ──────────────────────────────────────────────────────────

export const trendingSkills = pgTable('trending_skills', {
  id: serial('id').primaryKey().notNull(),
  skillName: varchar('skill_name', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  popularityScore: integer('popularity_score').notNull(),
  growth: integer('growth').notNull(), 
  demand: integer('demand').notNull(), 
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});

export type TrendingSkill = typeof trendingSkills.$inferSelect;
export type NewTrendingSkill = typeof trendingSkills.$inferInsert;

// ─── Roles ────────────────────────────────────────────────────────────────────

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  careerLevel: varchar('career_level', { length: 50 }), // 'Entry Level' | 'Mid Career' | 'Senior'
  estimateYears: varchar('estimate_years', { length: 50 }), // '1-2 Years', '3-4 Years', dll
  isPopular: boolean('is_popular').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id').notNull().references(() => roles.id),
  question: text('question').notNull(),
  options: jsonb('options').notNull(),
  correctAnswer: integer('correct_answer').notNull(),
  skillName: varchar('skill_name', { length: 100 }).notNull(),
  difficulty: varchar('difficulty', { length: 20 }).notNull(),
  explanation: text('explanation'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizResults = pgTable('quiz_results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
  overallMatch: integer('overall_match').notNull(),
  levelBadge: varchar('level_badge', { length: 20 }).notNull(),
  skillsAnalysis: jsonb('skills_analysis').notNull(),
  totalCorrect: integer('total_correct').default(0),
  totalIncorrect: integer('total_incorrect').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizAnswers = pgTable('quiz_answers', {
  id: serial('id').primaryKey(),
  resultId: integer('result_id').notNull().references(() => quizResults.id),
  questionId: integer('question_id').notNull().references(() => quizQuestions.id),
  selectedOption: integer('selected_option'),
  isCorrect: integer('is_correct'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Roadmap Levels ───────────────────────────────────────────────────────────

export const roadmapLevels = pgTable('roadmap_levels', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id),
  level: varchar('level', { length: 20 }).notNull(), // 'beginner' | 'intermediate' | 'advanced'
  levelLabel: varchar('level_label', { length: 50 }).notNull(), // 'Beginner Level' | 'Intermediate Level' | 'Advanced Level'
  description: text('description'), // "Building the foundation of..."
  skills: jsonb('skills').notNull(), // ["User Research", "Wireframing"]
  tools: jsonb('tools').notNull(), // ["Figma", "Notion"]
  order: integer('order').notNull(), // 1, 2, 3 — urutan tampil
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Daily Mission Tasks ──────────────────────────────────────────────────────
// 5 task per roadmap level. Setiap task punya instruksi & pertanyaan essay.

export const missionTasks = pgTable('mission_tasks', {
  id: serial('id').primaryKey(),
  roadmapLevelId: integer('roadmap_level_id')
    .notNull()
    .references(() => roadmapLevels.id),
  order: integer('order').notNull(), // 1–5
  title: varchar('title', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  difficulty: varchar('difficulty', { length: 20 }).notNull(), // 'Easy' | 'Medium' | 'Hard'
  durationMinutes: integer('duration_minutes').notNull(),
  description: text('description').notNull(),
  learningGoal: text('learning_goal').notNull(),
  instructions: jsonb('instructions').notNull(), // ["step 1", "step 2", ...]
  requirements: jsonb('requirements').notNull(), // ["Header section", "Search bar", ...]
  hint: text('hint'),
  // Tipe submission yang diterima
  acceptsFigmaLink: boolean('accepts_figma_link').default(true),
  acceptsFileUpload: boolean('accepts_file_upload').default(true),
  // 3 pertanyaan essay refleksi
  question1: text('question1').notNull(),
  question2: text('question2').notNull(),
  question3: text('question3').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── User Task Submissions ────────────────────────────────────────────────────
// Setiap kali user submit satu task, satu record dibuat di sini.
// Score = apakah task ini di-submit atau tidak (1 task = 1 poin).
// Progress level = jumlah task submitted / total task × 100.

export const userTaskSubmissions = pgTable('user_task_submissions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  taskId: integer('task_id')
    .notNull()
    .references(() => missionTasks.id),
  roadmapLevelId: integer('roadmap_level_id')
    .notNull()
    .references(() => roadmapLevels.id),
  // Bukti kerja
  figmaLink: text('figma_link'),
  fileUrl: text('file_url'),
  // Jawaban 3 pertanyaan essay
  answer1: text('answer1').notNull(),
  answer2: text('answer2').notNull(),
  answer3: text('answer3').notNull(),
  // Status
  status: varchar('status', { length: 20 }).notNull().default('submitted'), // 'submitted' | 'draft'
  submittedAt: timestamp('submitted_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});
