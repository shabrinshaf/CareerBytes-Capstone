import { Router } from 'express';

import {
  getPeriods,
  getSkillsByYear,
} from '../controllers/trendingSkillsController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/periods', protect, getPeriods);
router.get('/', protect, getSkillsByYear);

export default router;
