import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 💡 MEMAKSA DRIZZLE MEMBACA .ENV DI ROOT PROJECT SECARA ABSOLUT
dotenv.config({ path: path.resolve(__dirname, '.env') });

const databaseUrl =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${
    process.env.DB_PORT ?? '5432'
  }/${process.env.DB_NAME}`;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  // Gunakan dbCredentials jika diversi drizzle-kit kamu masih v0.21 ke bawah, atau sesuaikan dengan yang tidak merah
  dbCredentials: {
    url: databaseUrl,
    ssl: true,
  },
});
