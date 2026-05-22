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

/**
 * @openapi
 * /api/daily-mission/roadmap/{roleId}:
 *   get:
 *     summary: Ambil semua level roadmap beserta progress dan status lock/unlock user
 *     tags: [Daily Mission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID role karier
 *         example: 3
 *     responses:
 *       200:
 *         description: Data roadmap dengan progress user berhasil diambil
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
 *                     roleId:
 *                       type: integer
 *                       example: 3
 *                     roleName:
 *                       type: string
 *                       example: Backend Engineer
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
 *                           tools:
 *                             type: array
 *                             items:
 *                               type: string
 *                           order:
 *                             type: integer
 *                             example: 1
 *                           isUnlocked:
 *                             type: boolean
 *                             description: Level pertama selalu true, level berikutnya terbuka jika level sebelumnya 100%
 *                             example: true
 *                           isCompleted:
 *                             type: boolean
 *                             description: True jika semua task di level ini sudah di-submit
 *                             example: false
 *                           progress:
 *                             type: object
 *                             properties:
 *                               submitted:
 *                                 type: integer
 *                                 example: 3
 *                               total:
 *                                 type: integer
 *                                 example: 5
 *                               percent:
 *                                 type: integer
 *                                 example: 60
 *       400:
 *         description: roleId tidak valid
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Role tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.get('/roadmap/:roleId', getRoadmapWithProgress);

// GET  /api/daily-mission/tasks/:roadmapLevelId
// → 5 task list untuk satu level + status submitted per task

/**
 * @openapi
 * /api/daily-mission/tasks/{roadmapLevelId}:
 *   get:
 *     summary: Ambil daftar task untuk satu level roadmap beserta status per task
 *     tags: [Daily Mission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roadmapLevelId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID level roadmap
 *         example: 7
 *     responses:
 *       200:
 *         description: Daftar task berhasil diambil
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 31
 *                       order:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Buat REST API sederhana dengan Express.js
 *                       category:
 *                         type: string
 *                         example: Backend Development
 *                       difficulty:
 *                         type: string
 *                         enum: [Easy, Medium, Hard]
 *                         example: Easy
 *                       durationMinutes:
 *                         type: integer
 *                         example: 60
 *                       isSubmitted:
 *                         type: boolean
 *                         description: True jika user sudah submit task ini
 *                         example: false
 *       400:
 *         description: roadmapLevelId tidak valid
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Level tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.get('/tasks/:roadmapLevelId', getTasksByLevel);

// GET  /api/daily-mission/task/:taskId
// → Detail satu task (deskripsi, instruksi, requirements, 3 pertanyaan)

/**
 * @openapi
 * /api/daily-mission/task/{taskId}:
 *   get:
 *     summary: Ambil detail lengkap satu task (instruksi, requirements, dan pertanyaan essay)
 *     tags: [Daily Mission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID task
 *         example: 31
 *     responses:
 *       200:
 *         description: Detail task berhasil diambil
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
 *                       example: 31
 *                     title:
 *                       type: string
 *                       example: Buat REST API sederhana dengan Express.js
 *                     category:
 *                       type: string
 *                       example: Backend Development
 *                     difficulty:
 *                       type: string
 *                       enum: [Easy, Medium, Hard]
 *                       example: Easy
 *                     durationMinutes:
 *                       type: integer
 *                       example: 60
 *                     description:
 *                       type: string
 *                       example: Buat endpoint CRUD sederhana menggunakan Express.js dan PostgreSQL
 *                     learningGoal:
 *                       type: string
 *                       example: Memahami cara membuat REST API dengan Express.js
 *                     instructions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Install Express.js", "Buat file app.js", "Tambahkan route GET /items"]
 *                     requirements:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Minimal 3 endpoint", "Gunakan PostgreSQL", "Ada error handling"]
 *                     hint:
 *                       type: string
 *                       nullable: true
 *                       example: Gunakan middleware express.json() agar body request terbaca
 *                     acceptsFigmaLink:
 *                       type: boolean
 *                       example: true
 *                     acceptsFileUpload:
 *                       type: boolean
 *                       example: true
 *                     question1:
 *                       type: string
 *                       example: Apa tantangan terbesar yang kamu hadapi saat mengerjakan task ini?
 *                     question2:
 *                       type: string
 *                       example: Apa yang kamu pelajari dari task ini?
 *                     question3:
 *                       type: string
 *                       example: Bagaimana kamu akan mengembangkan hasil kerjamu lebih lanjut?
 *       400:
 *         description: taskId tidak valid
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Task tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.get('/task/:taskId', getTaskDetail);

// POST /api/daily-mission/task/:taskId/submit
// → Submit task (figmaLink/fileUrl + 3 jawaban essay)
// → Progress roadmap bar otomatis update

/**
 * @openapi
 * /api/daily-mission/task/{taskId}/submit:
 *   post:
 *     summary: Submit task (final) — progress level otomatis terupdate
 *     tags: [Daily Mission]
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       Menyimpan submission final task. Progress level user otomatis naik setelah submit.
 *       Level berikutnya akan terbuka jika semua task di level ini sudah di-submit (progress 100%).
 *       Task yang sudah di-submit tidak bisa di-submit ulang.
 *       Level harus sudah terbuka (unlock) sebelum task bisa di-submit.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID task yang akan di-submit
 *         example: 31
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [answer1, answer2, answer3]
 *             properties:
 *               figmaLink:
 *                 type: string
 *                 format: uri
 *                 description: URL Figma sebagai bukti kerja (wajib jika fileUrl kosong)
 *                 example: https://figma.com/file/abc123
 *               fileUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL file sebagai bukti kerja (wajib jika figmaLink kosong)
 *                 example: ""
 *               answer1:
 *                 type: string
 *                 minLength: 10
 *                 description: Jawaban pertanyaan refleksi pertama
 *                 example: Tantangan terbesar saya adalah memahami konsep middleware...
 *               answer2:
 *                 type: string
 *                 minLength: 10
 *                 description: Jawaban pertanyaan refleksi kedua
 *                 example: Saya belajar cara menggunakan express.Router untuk modularisasi...
 *               answer3:
 *                 type: string
 *                 minLength: 10
 *                 description: Jawaban pertanyaan refleksi ketiga
 *                 example: Saya akan menambahkan autentikasi JWT pada API ini...
 *     responses:
 *       201:
 *         description: Task berhasil di-submit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task berhasil di-submit! 🎉"
 *                 data:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: integer
 *                       example: 31
 *                     taskTitle:
 *                       type: string
 *                       example: Buat REST API sederhana dengan Express.js
 *                     levelProgress:
 *                       type: object
 *                       properties:
 *                         submitted:
 *                           type: integer
 *                           example: 4
 *                         total:
 *                           type: integer
 *                           example: 5
 *                         percent:
 *                           type: integer
 *                           example: 80
 *                     isLevelCompleted:
 *                       type: boolean
 *                       example: false
 *                     roadmapLevelId:
 *                       type: integer
 *                       example: 7
 *                     nextLevelUnlocked:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Validasi gagal, task sudah pernah di-submit, atau bukti kerja tidak disertakan
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       403:
 *         description: Level sebelumnya belum diselesaikan (masih terkunci)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Selesaikan Beginner Level terlebih dahulu
 *       404:
 *         description: Task atau level tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.post('/task/:taskId/submit', submitTask);

// POST /api/daily-mission/task/:taskId/draft
// → Simpan draft (progress belum naik)

/**
 * @openapi
 * /api/daily-mission/task/{taskId}/draft:
 *   post:
 *     summary: Simpan draft task — progress belum naik
 *     tags: [Daily Mission]
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       Menyimpan progres pengerjaan task sebagai draft. Progress level user tidak naik.
 *       Jika draft sudah ada sebelumnya, draft akan diperbarui (upsert).
 *       Semua field bersifat opsional — bisa simpan sebagian.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID task yang akan disimpan sebagai draft
 *         example: 31
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               figmaLink:
 *                 type: string
 *                 format: uri
 *                 description: URL Figma (opsional)
 *                 example: https://figma.com/file/abc123
 *               fileUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL file (opsional)
 *                 example: ""
 *               answer1:
 *                 type: string
 *                 description: Draft jawaban pertanyaan pertama (opsional)
 *                 example: Saya sedang mengerjakan...
 *               answer2:
 *                 type: string
 *                 description: Draft jawaban pertanyaan kedua (opsional)
 *                 example: ""
 *               answer3:
 *                 type: string
 *                 description: Draft jawaban pertanyaan ketiga (opsional)
 *                 example: ""
 *     responses:
 *       200:
 *         description: Draft berhasil disimpan atau diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Draft berhasil disimpan
 *                 data:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: integer
 *                       example: 31
 *                     status:
 *                       type: string
 *                       example: draft
 *       400:
 *         description: taskId tidak valid
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Task tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.post('/task/:taskId/draft', saveDraft);

export default router;
