import { Router } from 'express';
import {
  getQuestions,
  submitAssessment,
  getResult,
} from '../controllers/skillAssessmentController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @openapi
 * /api/skill-assessment/questions:
 *   get:
 *     summary: Ambil soal kuis berdasarkan nama role karier
 *     tags: [Skill Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: Nama role karier (case-sensitive, sesuai data di database)
 *         example: UI/UX Designer
 *     responses:
 *       200:
 *         description: Daftar soal kuis berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 role:
 *                   type: string
 *                   example: UI/UX Designer
 *                 total:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       question:
 *                         type: string
 *                         example: Apa kepanjangan dari UX?
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["User Experience", "User Extension", "Ultra Experience", "Unified Exchange"]
 *                       skillName:
 *                         type: string
 *                         example: UX Fundamentals
 *                       difficulty:
 *                         type: string
 *                         enum: [easy, medium, hard]
 *                         example: easy
 *       400:
 *         description: Query parameter role tidak valid atau kosong
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Role tidak ditemukan di database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role "Desainer UI" tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.get('/questions', protect, getQuestions);

/**
 * @openapi
 * /api/skill-assessment/submit:
 *   post:
 *     summary: Submit jawaban kuis dan dapatkan hasil assessment
 *     tags: [Skill Assessment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roleId, answers]
 *             properties:
 *               roleId:
 *                 type: integer
 *                 description: ID role yang diikuti kuis-nya
 *                 example: 1
 *               answers:
 *                 type: array
 *                 minItems: 1
 *                 description: Array jawaban untuk setiap soal
 *                 items:
 *                   type: object
 *                   required: [questionId, selectedOption]
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                       description: ID soal dari response GET /questions
 *                       example: 1
 *                     selectedOption:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 3
 *                       description: Index jawaban yang dipilih (0–3)
 *                       example: 0
 *     responses:
 *       201:
 *         description: Assessment selesai, hasil berhasil disimpan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assessment Complete!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 5
 *                     role_applied:
 *                       type: string
 *                       example: UI/UX Designer
 *                     overall_match:
 *                       type: integer
 *                       description: Persentase jawaban benar (0–100)
 *                       example: 70
 *                     level_badge:
 *                       type: string
 *                       enum: [BEGINNER, INTERMEDIATE, ADVANCED]
 *                       description: "ADVANCED ≥80%, INTERMEDIATE 50–79%, BEGINNER <50%"
 *                       example: INTERMEDIATE
 *                     skills_analysis:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           skill_name:
 *                             type: string
 *                             example: UX Fundamentals
 *                           score:
 *                             type: number
 *                             example: 66.7
 *                           status:
 *                             type: string
 *                             enum: [match, gap]
 *                             example: gap
 *                           display_text:
 *                             type: string
 *                             example: 33.3% Gap
 *       400:
 *         description: Validasi gagal atau questionId tidak valid
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       500:
 *         description: Server Error
 */
router.post('/submit', protect, submitAssessment);

/**
 * @openapi
 * /api/skill-assessment/result:
 *   get:
 *     summary: Lihat hasil assessment terakhir user yang sedang login
 *     tags: [Skill Assessment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hasil assessment terakhir berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 5
 *                     role_applied:
 *                       type: string
 *                       example: UI/UX Designer
 *                     overall_match:
 *                       type: integer
 *                       example: 70
 *                     level_badge:
 *                       type: string
 *                       enum: [BEGINNER, INTERMEDIATE, ADVANCED]
 *                       example: INTERMEDIATE
 *                     skills_analysis:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           skill_name:
 *                             type: string
 *                             example: UX Fundamentals
 *                           score:
 *                             type: number
 *                             example: 66.7
 *                           status:
 *                             type: string
 *                             enum: [match, gap]
 *                           display_text:
 *                             type: string
 *                             example: 33.3% Gap
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Belum ada hasil assessment untuk user ini
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Belum ada hasil assessment
 *       500:
 *         description: Server Error
 */
router.get('/result', protect, getResult);

export default router;
