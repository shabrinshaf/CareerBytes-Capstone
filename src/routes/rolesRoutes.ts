import { Router } from 'express';

import {
  getPopularRoles,
  searchRoles,
} from '../controllers/careerRoadmapController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/roles/popular  ← harus di atas / supaya tidak konflik

/**
 * @openapi
 * /api/roles/popular:
 *   get:
 *     summary: Ambil daftar role karier yang populer
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar role populer berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: UI/UX Designer
 *                       description:
 *                         type: string
 *                         example: Design intuitive and engaging digital experiences
 *                       careerLevel:
 *                         type: string
 *                         example: Entry Level
 *                       estimateYears:
 *                         type: string
 *                         example: 1-2 Years
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       500:
 *         description: Server Error
 */
router.get('/popular', protect, getPopularRoles);

// GET /api/roles?query=<keyword>
/**
 * @openapi
 * /api/roles:
 *   get:
 *     summary: Cari role karier berdasarkan keyword
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword pencarian nama role (case-insensitive, partial match)
 *         example: backend
 *     responses:
 *       200:
 *         description: Hasil pencarian role berhasil diambil (maks. 10 hasil)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 total:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       name:
 *                         type: string
 *                         example: Backend Engineer
 *                       description:
 *                         type: string
 *                         example: Membangun dan maintain server-side applications
 *                       careerLevel:
 *                         type: string
 *                         example: Entry Level
 *                       estimateYears:
 *                         type: string
 *                         example: 1-2 Years
 *                       isPopular:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Query parameter tidak valid atau kosong
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Tidak ada role yang cocok, disertai daftar saran role populer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tidak ada role yang cocok dengan "xyz"
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Frontend Developer", "Backend Engineer", "UI/UX Designer"]
 *       500:
 *         description: Server Error
 */
router.get('/', protect, searchRoles);

export default router;
