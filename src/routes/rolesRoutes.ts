import { Router } from 'express';

import {
  getPopularRoles,
  searchRoles,
} from '../controllers/careerRoadmapController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/roles/popular  ← harus di atas / supaya tidak konflik
router.get('/popular', protect, getPopularRoles);

// GET /api/roles?query=<keyword>
router.get('/', protect, searchRoles);

export default router;
