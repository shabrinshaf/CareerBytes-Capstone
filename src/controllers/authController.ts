import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db';
import { users } from '../db/schema';

import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

const signToken = (id: number, email: string): string =>
  jwt.sign({ id, email }, getJwtSecret(), {
    expiresIn: '7d',
  });

const getDatabaseErrorCode = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }

  const errorWithCode = error as {
    code?: unknown;
    cause?: { code?: unknown };
  };

  if (typeof errorWithCode.code === 'string') {
    return errorWithCode.code;
  }

  if (typeof errorWithCode.cause?.code === 'string') {
    return errorWithCode.cause.code;
  }

  return undefined;
};

//---------- REGISTER ------------
export const register = async (req: Request, res: Response): Promise<void> => {
  // Data req.body sudah divalidasi oleh middleware sebelum masuk ke sini
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      res.status(409).json({ message: 'Email anda sudah terdaftar' });
      return;
    }

    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Simpan ke database
    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning({ id: users.id, name: users.name, email: users.email });

    const token = signToken(newUser.id, newUser.email);

    res.status(201).json({
      message: 'Registrasi berhasil',
      token,
      user: newUser,
    });
  } catch (err: unknown) {
    const code = getDatabaseErrorCode(err);
    if (code === '23505') {
      res.status(409).json({ message: 'Email anda sudah terdaftar' });
      return;
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

//---------- LOGIN ------------
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // 1. Cari user berdasarkan email
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user || !user.password) {
      res.status(401).json({ message: 'Email atau password salah' });
      return;
    }

    // 2. Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Email atau password salah' });
      return;
    }

    // 3. Generate token JWT
    const token = signToken(user.id, user.email);

    // 4. Kirim respon dengan token
    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roleId: user.roleId,
      },
    });
  } catch (err) {
    console.log('error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//---------- GET ME ------------

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar: users.avatar,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, req.user!.id));

    res.json({ user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

//---------- OAUTH CALLBACK ------------

export const oauthCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as { id: number; email: string };
    const token = signToken(user.id, user.email);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
