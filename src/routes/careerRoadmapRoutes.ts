import { Router } from 'express';

import {
  getDefaultRoadmap,
  getRoadmapByRole,
} from '../controllers/careerRoadmapController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/career-roadmap/default  ← harus di atas /:role supaya tidak konflik
router.get('/default', protect, getDefaultRoadmap);

// GET /api/career-roadmap?role=Frontend Developer
router.get('/', protect, getRoadmapByRole);

export default router;
