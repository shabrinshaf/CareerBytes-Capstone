import { Router } from 'express';

import {
  getDefaultRoadmap,
  getRoadmapByRole,
} from '../controllers/careerRoadmapController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/career-roadmap/default  ← harus di atas /:role supaya tidak konflik

/**
 * @openapi
 * /api/career-roadmap/default:
 *   get:
 *     summary: Ambil roadmap berdasarkan role yang sudah dipilih user
 *     tags: [Career Roadmap]
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       Mengembalikan roadmap karier sesuai `roleId` yang tersimpan di profil user.
 *       User harus sudah memilih role terlebih dahulu via `PATCH /api/auth/me/role`.
 *     responses:
 *       200:
 *         description: Roadmap berhasil diambil
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
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: Backend Engineer
 *                     description:
 *                       type: string
 *                       example: Membangun dan maintain server-side applications
 *                     careerLevel:
 *                       type: string
 *                       example: Entry Level
 *                     estimateYears:
 *                       type: string
 *                       example: 1-2 Years
 *                     levels:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 7
 *                           level:
 *                             type: string
 *                             enum: [beginner, intermediate, advanced]
 *                             example: beginner
 *                           levelLabel:
 *                             type: string
 *                             example: Beginner Level
 *                           description:
 *                             type: string
 *                             example: Building the foundation of backend development
 *                           skills:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Node.js Basics", "REST API", "SQL"]
 *                           tools:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Express.js", "PostgreSQL", "Postman"]
 *                           order:
 *                             type: integer
 *                             example: 1
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: User belum memilih role atau role tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kamu belum memilih role karier. Pilih role terlebih dahulu.
 *       500:
 *         description: Server Error
 */
router.get('/default', protect, getDefaultRoadmap);

// GET /api/career-roadmap?role=Frontend Developer

/**
 * @openapi
 * /api/career-roadmap:
 *   get:
 *     summary: Ambil roadmap berdasarkan nama role karier
 *     tags: [Career Roadmap]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: Nama role karier (case-insensitive)
 *         example: Frontend Developer
 *     responses:
 *       200:
 *         description: Roadmap berhasil diambil
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
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: Frontend Developer
 *                     description:
 *                       type: string
 *                       example: Membangun user interface dan pengalaman pengguna
 *                     careerLevel:
 *                       type: string
 *                       example: Entry Level
 *                     estimateYears:
 *                       type: string
 *                       example: 1-2 Years
 *                     levels:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           level:
 *                             type: string
 *                             enum: [beginner, intermediate, advanced]
 *                           levelLabel:
 *                             type: string
 *                           description:
 *                             type: string
 *                           skills:
 *                             type: array
 *                             items:
 *                               type: string
 *                           tools:
 *                             type: array
 *                             items:
 *                               type: string
 *                           order:
 *                             type: integer
 *       400:
 *         description: Query parameter role tidak valid atau kosong
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Role tidak ditemukan, disertai daftar saran role populer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Career roadmap untuk "Desainer" tidak ditemukan
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Frontend Developer", "Backend Engineer", "UI/UX Designer"]
 *       500:
 *         description: Server Error
 */
router.get('/', protect, getRoadmapByRole);

export default router;
