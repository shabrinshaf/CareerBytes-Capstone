import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcryptjs';
import db from './db'; // Import default (tanpa kurung kurawal)
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';


// 1. Auth Biasa (Local)
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) {
          return done(null, false, { message: 'User tidak ditemukan' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Password salah' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// 2. Auth Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/api/auth/google/callback', // Gunakan URL lengkap
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Cek apakah user sudah ada berdasarkan googleId
        let [user] = await db
          .select()
          .from(users)
          .where(eq(users.googleId, profile.id));

        if (!user) {
          // Jika belum ada, buat user baru
          [user] = await db
            .insert(users)
            .values({
              name: profile.displayName || 'User',
              email: profile.emails?.[0].value || '',
              googleId: profile.id, // Sesuaikan dengan nama di schema.ts
              avatar: profile.photos?.[0].value || '',
            })
            .returning();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

//3. Auth GitHub
passport.use(
  new GitHubStrategy(
    {
      // Menggunakan fallback string jika environment variable belum termuat di runtime
      clientID: process.env.GITHUB_CLIENT_ID || 'mock_github_client_id_careerbytes',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock_github_client_secret_careerbytes',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
      scope: ['user:email'], // Agar kita dapat email user
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any,
    ) => {
      try {
        // Cari user berdasarkan email atau GitHub ID
        const email = profile.emails?.[0]?.value;
        let [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user) {
          // Kalau belum ada, buat user baru
          [user] = await db
            .insert(users)
            .values({
              name: profile.displayName || profile.username,
              email: email,
              githubId: profile.id, // Ambil ID dari profile GitHub
              avatar: profile.photos?.[0]?.value, // Ambil foto profil GitHub
            })
            .returning();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

export default passport;
