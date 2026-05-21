import { Router } from 'express';
import { getPeriods, getTrendingSkills, getUniqueJobs } from '../controllers/trendingSkillsController'; // 1. Ambil fungsi getUniqueJobs dari controller
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/periods', protect, getPeriods);
router.get('/jobs', getUniqueJobs); // 2. Tambahkan rute baru ini di sini (tanpa protect agar publik/bisa diakses frontend langsung)
router.get('/', getTrendingSkills);

export default router;