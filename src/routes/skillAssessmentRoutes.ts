import { Router } from 'express';
import { getQuestions, submitAssessment, getResult } from '../controllers/skillAssessmentController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/questions', protect, getQuestions);
router.post('/submit', protect, submitAssessment);
router.get('/result', protect, getResult);

export default router;