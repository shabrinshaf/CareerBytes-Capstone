import { Router } from 'express';
import {
  getPeriods,
  getTrendingSkills,
  getUniqueJobs,
} from '../controllers/trendingSkillsController'; // 1. Ambil fungsi getUniqueJobs dari controller
import { protect } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @openapi
 * /api/trending-skills/periods:
 *   get:
 *     summary: Ambil daftar tahun yang tersedia di data trending skills
 *     tags: [Trending Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar tahun berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [2025, 2024, 2023]
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       500:
 *         description: Server Error
 */
router.get('/periods', protect, getPeriods);

/**
 * @openapi
 * /api/trending-skills/jobs:
 *   get:
 *     summary: Ambil daftar nama skill unik (publik, tanpa autentikasi)
 *     tags: [Trending Skills]
 *     responses:
 *       200:
 *         description: Daftar nama skill unik berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Frontend Developer", "Data Analyst", "DevOps Engineer"]
 *       500:
 *         description: Internal Server Error
 */
router.get('/jobs', getUniqueJobs); // 2. Tambahkan rute baru ini di sini (tanpa protect agar publik/bisa diakses frontend langsung)

/**
 * @openapi
 * /api/trending-skills:
 *   get:
 *     summary: Ambil semua data trending skills (publik, tanpa autentikasi)
 *     tags: [Trending Skills]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter data berdasarkan tahun tertentu
 *         example: 2024
 *     responses:
 *       200:
 *         description: Data trending skills berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       skillName:
 *                         type: string
 *                         example: Frontend Developer
 *                       year:
 *                         type: integer
 *                         example: 2024
 *                       popularityScore:
 *                         type: integer
 *                         example: 95
 *                       growth:
 *                         type: integer
 *                         example: 12
 *                       demand:
 *                         type: integer
 *                         example: 88
 *                       createdAt:
 *                         type: string
 *                         example: "2024-01-01T00:00:00.000Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getTrendingSkills);

export default router;
