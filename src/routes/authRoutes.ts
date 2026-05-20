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

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.patch('/me/role', protect, selectUserRole); // ← user pilih role karier

// --- AUTH GOOGLE ---
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
    session: false,
  }),
  oauthCallback,
);

// --- AUTH GITHUB ---

// Jalur buat user ngeklik "Login with GitHub"
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
  }),
);

// Jalur balik dari GitHub ke server kita
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=github_failed`,
    session: false,
  }),
  oauthCallback,
);

export default router;
