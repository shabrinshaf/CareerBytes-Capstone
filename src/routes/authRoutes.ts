import { Router } from 'express';
import passport from 'passport';

import {
  getMe,
  login,
  oauthCallback,
  register,
} from '../controllers/authController';
import { selectUserRole } from '../controllers/careerRoadmapController';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { loginSchema, registerSchema } from '../validators/authSchema';

const router = Router();

// --- AUTH MANUAL (DENGAN VALIDASI) ---
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrasi akun baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Budi Santoso
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registrasi berhasil
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Budi Santoso
 *                     email:
 *                       type: string
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validasi gagal
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Format email tidak valid
 *       409:
 *         description: Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email anda sudah terdaftar
 *       500:
 *         description: Server Error
 */
router.post('/register', validate(registerSchema), register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login dan dapatkan JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login berhasil
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Budi Santoso
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/avatar.jpg
 *                     roleId:
 *                       type: integer
 *                       nullable: true
 *                       example: 3
 *       400:
 *         description: Validasi gagal
 *       401:
 *         description: Email atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email atau password salah
 *       500:
 *         description: Server Error
 */
router.post('/login', validate(loginSchema), login);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Lihat profil user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Budi Santoso
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/avatar.jpg
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-15T08:30:00.000Z
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       500:
 *         description: Server Error
 */
router.get('/me', protect, getMe);

/**
 * @openapi
 * /api/auth/me/role:
 *   patch:
 *     summary: Pilih role karier untuk akun user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roleId]
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Role berhasil dipilih
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role berhasil dipilih: Backend Engineer"
 *                 data:
 *                   type: object
 *                   properties:
 *                     roleId:
 *                       type: integer
 *                       example: 3
 *                     roleName:
 *                       type: string
 *                       example: Backend Engineer
 *       400:
 *         description: Validasi gagal (roleId tidak valid)
 *       401:
 *         description: Token tidak ada atau tidak valid
 *       404:
 *         description: Role tidak ditemukan
 *       500:
 *         description: Server Error
 */
router.patch('/me/role', protect, selectUserRole); // ← user pilih role karier

// --- AUTH GOOGLE ---

/**
 * @openapi
 * /api/auth/google:
 *   get:
 *     summary: Redirect ke halaman login Google
 *     tags: [Auth - OAuth]
 *     description: >
 *       Arahkan browser ke endpoint ini untuk memulai alur OAuth Google.
 *       Setelah login berhasil, Google akan redirect ke `/api/auth/google/callback`
 *       dan server akan redirect ke `CLIENT_URL/auth/callback?token=<JWT>`.
 *     responses:
 *       302:
 *         description: Redirect ke Google OAuth consent screen
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false,
  }),
);

/**
 * @openapi
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback URL setelah autentikasi Google berhasil
 *     tags: [Auth - OAuth]
 *     description: >
 *       Endpoint ini dipanggil otomatis oleh Google setelah user memberikan izin.
 *       Jangan dipanggil manual. Jika berhasil, user akan di-redirect ke
 *       `CLIENT_URL/auth/callback?token=<JWT>`.
 *     responses:
 *       302:
 *         description: Redirect ke frontend dengan JWT token sebagai query param
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
    session: false,
  }),
  oauthCallback,
);

// --- AUTH GITHUB ---

/**
 * @openapi
 * /api/auth/github:
 *   get:
 *     summary: Redirect ke halaman login GitHub
 *     tags: [Auth - OAuth]
 *     description: >
 *       Arahkan browser ke endpoint ini untuk memulai alur OAuth GitHub.
 *       Setelah login berhasil, GitHub akan redirect ke `/api/auth/github/callback`
 *       dan server akan redirect ke `CLIENT_URL/auth/callback?token=<JWT>`.
 *     responses:
 *       302:
 *         description: Redirect ke GitHub OAuth authorization page
 */
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
  }),
);

/**
 * @openapi
 * /api/auth/github/callback:
 *   get:
 *     summary: Callback URL setelah autentikasi GitHub berhasil
 *     tags: [Auth - OAuth]
 *     description: >
 *       Endpoint ini dipanggil otomatis oleh GitHub setelah user memberikan izin.
 *       Jangan dipanggil manual. Jika berhasil, user akan di-redirect ke
 *       `CLIENT_URL/auth/callback?token=<JWT>`.
 *     responses:
 *       302:
 *         description: Redirect ke frontend dengan JWT token sebagai query param
 */
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=github_failed`,
    session: false,
  }),
  oauthCallback,
);

export default router;
