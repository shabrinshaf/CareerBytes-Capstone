import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema'; // Sesuaikan path ke schema.ts kamu
import 'dotenv/config';

const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

// 1. Buat koneksi mentah (Pool)
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {
        host: process.env.DB_HOST,
        port: dbPort,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
);

// 2. Hubungkan Pool ke Drizzle
export const db = drizzle(pool, { schema });

// Opsional: Cek koneksi
pool
  .connect() // eslint-disable-next-line no-console
  .then(() => console.log('Database Connected (Drizzle Ready)')) // eslint-disable-next-line no-console
  .catch((err) => console.error('Database Connection error: ', err));

export default db; // Pastikan export-nya db, bukan pool
