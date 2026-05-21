import dotenv from 'dotenv';
import path from 'path';

// Load environment secara absolute path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { db } from '../config/db';
import { sql } from 'drizzle-orm';

// Import objek tabel roles aktual dari schema kamu
// Catatan: sesuaikan nama import 'roles' di bawah ini dengan nama export tabel di schema.ts Anda
import { roles } from './schema';

async function fixRolesTable() {
  try {
    console.log('[⚠️ CRITICAL] Mengosongkan tabel roles dan mereset penomoran ID otomatis...');

    // Mengeksekusi TRUNCATE langsung pada nama tabel fisik database untuk menghapus duplikasi
    // dan memaksa Sequence ID kembali mulai dari angka 1
    await db.execute(sql`TRUNCATE TABLE roles RESTART IDENTITY CASCADE;`);

    console.log('[ SEED] Mengisi ulang 10 Role Standar Assessment CareerBytes 2026...');

    const cleanRoles = [
      { name: 'AI / Machine Learning Engineer', description: 'Membangun dan men-deploy model machine learning' },
      { name: 'Cloud Engineer', description: 'Merancang dan mengelola infrastruktur komputasi cloud' },
      { name: 'Cybersecurity Specialist', description: 'Melindungi aset digital dari ancaman keamanan siber' },
      { name: 'IT Auditor & Governance Specialist', description: 'Mengaudit dan memastikan kepatuhan tata kelola TI' },
      { name: 'Data Analyst / Business Intelligence', description: 'Menganalisis data untuk menghasilkan insight bisnis dan intelijen' },
      { name: 'DevOps Engineer', description: 'Mengelola infrastruktur dan CI/CD pipeline' },
      { name: 'UI/UX Designer', description: 'Design intuitive and engaging digital experiences' },
      { name: 'Mobile Developer', description: 'Membangun aplikasi mobile iOS dan Android' },
      { name: 'Backend Engineer', description: 'Membangun dan maintain server-side applications' },
      { name: 'Frontend Developer', description: 'Membangun user interface dan pengalaman pengguna' }
    ];

    await db.insert(roles).values(cleanRoles);
    console.log('✅ [SUCCESS] Tabel roles berhasil dibersihkan total dan diurutkan dari ID 1-10!');
  } catch (error) {
    console.error('❌ [ERROR] Gagal membersihkan tabel roles:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

fixRolesTable();
