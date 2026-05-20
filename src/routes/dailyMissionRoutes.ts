import { Router } from 'express';

import {
  getRoadmapWithProgress,
  getTasksByLevel,
  getTaskDetail,
  submitTask,
  saveDraft,
} from '../controllers/dailyMissionController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Semua route butuh auth
router.use(protect);

// GET  /api/daily-mission/roadmap/:roleId
// → Roadmap + progress per level + lock/unlock status
router.get('/roadmap/:roleId', getRoadmapWithProgress);

// GET  /api/daily-mission/tasks/:roadmapLevelId
// → 5 task list untuk satu level + status submitted per task
router.get('/tasks/:roadmapLevelId', getTasksByLevel);

// GET  /api/daily-mission/task/:taskId
// → Detail satu task (deskripsi, instruksi, requirements, 3 pertanyaan)
router.get('/task/:taskId', getTaskDetail);

// POST /api/daily-mission/task/:taskId/submit
// → Submit task (figmaLink/fileUrl + 3 jawaban essay)
// → Progress roadmap bar otomatis update
router.post('/task/:taskId/submit', submitTask);

// POST /api/daily-mission/task/:taskId/draft
// → Simpan draft (progress belum naik)
router.post('/task/:taskId/draft', saveDraft);

export default router;
