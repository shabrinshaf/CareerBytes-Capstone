import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db';
import { users } from '../db/schema';

import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const signToken = (id: number, email: string): string =>
  jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

//---------- REGISTER ------------
export const register = async (req: Request, res: Response) => {
  // Data req.body sudah divalidasi oleh middleware sebelum masuk ke sini
  const { name, email, password } = req.body;

  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Simpan ke database
    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning({ id: users.id, name: users.name, email: users.email });

    res.status(201).json({ message: 'Registrasi Berhasi!', user: newUser });
  } catch (err: any) {
    const code = err.code ?? err.cause?.code;
    if (code === '23505') {
      res.status(400).json({ message: 'Email anda Sudah Terdaftar' });
      return;
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

//---------- LOGIN ------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Cari user berdasarkan email
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user || !user.password) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    // 2. Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // 3. Generate token JWT
    const token = signToken(user.id, user.email);

    // 4. Kirim respon dengan token
    res.json({ message: 'Login Berhasil!', token });
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
