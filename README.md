# CareerBytes Backend

Backend API untuk aplikasi CareerBytes — platform yang membantu kamu merencanakan karier di bidang teknologi.

Dibangun dengan **Express.js**, **TypeScript**, **Drizzle ORM**, dan **PostgreSQL**.

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Setup Database](#setup-database)
- [Menjalankan Server](#menjalankan-server)
- [Struktur Folder](#struktur-folder)
- [API Endpoints](#api-endpoints)
- [Cara Test API](#cara-test-api)
- [Scripts](#scripts)

---

## Prasyarat

Sebelum mulai, pastikan kamu sudah install ini di komputer:

### 1. Node.js

- Download di [nodejs.org](https://nodejs.org)
- Pilih versi **LTS** (yang paling stabil)
- Cek apakah sudah terinstall:
  ```bash
  node -v
  # Harusnya muncul v18.x.x atau lebih baru
  ```

### 2. PostgreSQL

- Download di [postgresql.org/download](https://www.postgresql.org/download/)
- Saat instalasi, kamu akan diminta buat **password untuk user postgres** — catat passwordnya!
- Cek apakah sudah terinstall:
  ```bash
  psql --version
  # Harusnya muncul psql (PostgreSQL) 15.x atau lebih baru
  ```

### 3. Git

- Download di [git-scm.com](https://git-scm.com)
- Cek apakah sudah terinstall:
  ```bash
  git --version
  ```

### 4. Postman (untuk test API)

- Download di [postman.com/downloads](https://www.postman.com/downloads/)

---

## Instalasi

### 1. Clone repository

```bash
git clone https://github.com/Rafi-agastya/careerBytes.git
cd careerBytes
```

### 2. Install dependencies

```bash
npm install
```

> Perintah ini akan mengunduh semua package yang dibutuhkan. Tunggu sampai selesai.

---

## Konfigurasi Environment

File `.env` berisi konfigurasi rahasia seperti password database. File ini **tidak boleh** di-upload ke GitHub.

### 1. Buat file `.env`

```bash
# Di terminal, jalankan:
cp .env.example .env
```

> Perintah ini membuat salinan file `.env.example` menjadi `.env`

### 2. Buka file `.env` dan isi nilainya

```env
# URL koneksi ke database PostgreSQL
# Format: postgresql://username:password@host:port/nama_database
DATABASE_URL=postgresql://postgres:password_kamu@localhost:5432/careerbytes

# Google OAuth (opsional, untuk fitur login dengan Google)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# GitHub OAuth (opsional, untuk fitur login dengan GitHub)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Secret key untuk JWT — isi dengan string random yang panjang
# Contoh: careerbytes_secret_key_2024_abcdefghijk
JWT_SECRET=isi_dengan_string_random_yang_panjang

# URL frontend
CLIENT_URL=http://localhost:5173

# Port server (default 3000)
PORT=3000
```

> **Catatan:** Ganti `password_kamu` di `DATABASE_URL` dengan password PostgreSQL yang kamu buat saat instalasi.

### 3. Buat database di PostgreSQL

Buka terminal baru dan jalankan:

```bash
psql -U postgres
```

Masukkan password PostgreSQL kamu, lalu buat database baru:

```sql
CREATE DATABASE careerbytes;
\q
```

---

## Setup Database

### 1. Push schema ke database

```bash
npx drizzle-kit push
```

> Perintah ini akan membuat semua tabel di database secara otomatis berdasarkan `src/db/schema.ts`. Jalankan setiap kali ada perubahan schema.

Kalau berhasil, kamu akan melihat output seperti:

```
[✓] Changes applied
```

### 2. Isi data awal (seed)

Jalankan seed secara berurutan:

```bash
# Isi data trending skills (JavaScript, Python, dll per tahun)
npm run seed

# Isi data roles & soal quiz assessment
npm run seed:assessment

# Isi data career roadmap (roles + level Beginner/Intermediate/Advanced)
npm run seed:roadmap
```

> **Penting:** Jalankan ketiga perintah di atas secara berurutan. Jangan dilewati.

---

## Menjalankan Server

```bash
npm run dev
```

Kalau berhasil, kamu akan melihat:

```
[nodemon] starting `ts-node src/app.ts`
Server running on PORT 3000
Database Connected (Drizzle Ready)
```

Server sekarang berjalan di `http://localhost:3000` 🎉

> **Catatan:** Nodemon akan otomatis restart server setiap kali kamu menyimpan perubahan file.

---

## Struktur Folder

```
src/
├── app.ts                          # Entry point — tempat server dimulai
├── config/
│   ├── db.ts                       # Koneksi ke database
│   └── passport.ts                 # Konfigurasi login OAuth (Google & GitHub)
├── controllers/                    # Logic utama tiap fitur
│   ├── authController.ts           # Register, login, get profile
│   ├── trendingSkillsController.ts # Data skill yang lagi trending
│   ├── skillAssessmentController.ts# Quiz assessment skill
│   └── careerRoadmapController.ts  # Career roadmap & pencarian role
├── db/
│   ├── schema.ts                   # Definisi tabel database
│   ├── seed.ts                     # Data awal trending skills
│   ├── seedAssessment.ts           # Data awal soal quiz
│   └── seedRoadmap.ts              # Data awal career roadmap
├── middlewares/
│   ├── authMiddleware.ts           # Cek apakah user sudah login (JWT)
│   └── validationMiddleware.ts     # Validasi input request
├── routes/                         # Definisi URL endpoint
│   ├── authRoutes.ts               # /api/auth/*
│   ├── trendingSkillsRoutes.ts     # /api/trending-skills/*
│   ├── skillAssessmentRoutes.ts    # /api/skill-assessment/*
│   ├── careerRoadmapRoutes.ts      # /api/career-roadmap/*
│   └── rolesRoutes.ts              # /api/roles/*
└── validators/                     # Schema validasi input (Zod)
    ├── authSchema.ts
    ├── trendingSkills.ts
    ├── skillAssessment.ts
    └── careerRoadmap.ts
```

---

## API Endpoints

> Semua endpoint kecuali Register dan Login membutuhkan **Bearer Token** di header Authorization.

### 🔐 Authentication

#### Register

```
POST /api/auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response sukses (`201`):

```json
{
  "message": "Registrasi berhasil!",
  "user": { "id": 1, "name": "John Doe", "email": "john@gmail.com" }
}
```

---

#### Login

```
POST /api/auth/login
```

Body:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response sukses (`200`):

```json
{
  "message": "Login berhasil!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> **Simpan token ini!** Token dibutuhkan untuk semua endpoint lainnya.

---

#### Get Profile

```
GET /api/auth/me
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@gmail.com",
    "avatar": null,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Pilih Role Karier

```
PATCH /api/auth/me/role
Authorization: Bearer <token>
```

Body:

```json
{
  "roleId": 1
}
```

Response sukses (`200`):

```json
{
  "message": "Role berhasil dipilih: UI/UX Designer",
  "data": { "roleId": 1, "roleName": "UI/UX Designer" }
}
```

---

#### Login dengan Google

```
GET /api/auth/google
```

> Buka URL ini di browser. Kamu akan diarahkan ke halaman login Google.

---

#### Login dengan GitHub

```
GET /api/auth/github
```

> Buka URL ini di browser. Kamu akan diarahkan ke halaman login GitHub.

---

### 📈 Trending Skills

#### Ambil Semua Periode (Tahun)

```
GET /api/trending-skills/periods
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "data": [2025, 2024, 2023]
}
```

---

#### Ambil Skills Berdasarkan Tahun

```
GET /api/trending-skills?year=2025
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "year": 2025,
  "data": [
    { "id": 1, "skillName": "AI/ML", "year": 2025, "popularityScore": 99 },
    { "id": 2, "skillName": "Python", "year": 2025, "popularityScore": 96 }
  ]
}
```

---

### 📝 Skill Assessment

#### Ambil Soal Quiz Berdasarkan Role

```
GET /api/skill-assessment/questions?role=Frontend Developer
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "role": "Frontend Developer",
  "total": 10,
  "data": [
    {
      "id": 1,
      "question": "How familiar are you with HTML and CSS?",
      "skillName": "HTML/CSS",
      "difficulty": "basic",
      "questionType": "rating",
      "hint": "Think about semantic HTML..."
    }
  ]
}
```

---

#### Submit Jawaban Assessment

```
POST /api/skill-assessment/submit
Authorization: Bearer <token>
```

Body contoh (rating question):

```json
{
  "roleId": 2,
  "answers": [
    { "questionId": 1, "score": 4 },
    { "questionId": 2, "score": 3 },
    {
      "questionId": 3,
      "essayAnswer": "I would use React.memo to prevent unnecessary re-renders and useMemo to memoize expensive calculations..."
    }
  ]
}
```

> Untuk `questionType: "rating"` isi `score` (1-5). Untuk `questionType: "essay"` isi `essayAnswer` (minimal 100 karakter).

Response sukses (`201`):

```json
{
  "message": "Assessment Complete!",
  "data": {
    "overallScore": 80,
    "matchedSkills": ["HTML/CSS", "React"],
    "missingSkills": ["TypeScript"],
    "skillLevels": { "HTML/CSS": "advanced", "React": "intermediate" },
    "skillComparison": {
      "HTML/CSS": { "yourScore": 80, "targetScore": 40, "status": "match" }
    }
  }
}
```

---

#### Lihat Hasil Assessment Terakhir

```
GET /api/skill-assessment/result
Authorization: Bearer <token>
```

---

### 🗺️ Career Roadmap

#### Cari Roadmap Berdasarkan Role

```
GET /api/career-roadmap?role=UI/UX Designer
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "UI/UX Designer",
    "description": "Design intuitive and engaging digital experiences...",
    "careerLevel": "Mid Career",
    "estimateYears": "3-4 Years",
    "levels": [
      {
        "level": "beginner",
        "levelLabel": "Beginner Level",
        "description": "Building the foundation of visual communication...",
        "skills": ["User Research", "Wireframing", "Typography"],
        "tools": ["Figma", "Notion"],
        "order": 1
      },
      {
        "level": "intermediate",
        "levelLabel": "Intermediate Level",
        "description": "Mastering interaction patterns...",
        "skills": ["Auto Layout", "Prototyping", "Design System"],
        "tools": ["Figma", "Adobe XD"],
        "order": 2
      },
      {
        "level": "advanced",
        "levelLabel": "Advanced Level",
        "description": "Leading design vision...",
        "skills": ["Leadership", "UX Strategy"],
        "tools": ["Notion"],
        "order": 3
      }
    ]
  }
}
```

Response tidak ditemukan (`404`):

```json
{
  "message": "Career roadmap untuk \"Blockchain Developer\" tidak ditemukan",
  "suggestions": [
    "UI/UX Designer",
    "Data Analyst",
    "Frontend Developer",
    "Product Manager"
  ]
}
```

---

#### Ambil Roadmap Role User yang Login

```
GET /api/career-roadmap/default
Authorization: Bearer <token>
```

> Endpoint ini akan return roadmap berdasarkan role yang sudah dipilih user lewat `PATCH /api/auth/me/role`. Kalau belum pilih role, akan return `404`.

---

### 🎯 Roles

#### Cari Role

```
GET /api/roles?query=frontend
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "total": 2,
  "data": [
    {
      "id": 2,
      "name": "Frontend Developer",
      "careerLevel": "Mid Career",
      "estimateYears": "2-3 Years"
    },
    {
      "id": 4,
      "name": "Full Stack Developer",
      "careerLevel": "Senior",
      "estimateYears": "4-5 Years"
    }
  ]
}
```

---

#### Ambil Role Populer

```
GET /api/roles/popular
Authorization: Bearer <token>
```

Response sukses (`200`):

```json
{
  "message": "Success",
  "total": 4,
  "data": [
    { "id": 1, "name": "UI/UX Designer", "careerLevel": "Mid Career" },
    { "id": 2, "name": "Frontend Developer", "careerLevel": "Mid Career" },
    { "id": 5, "name": "Data Analyst", "careerLevel": "Entry Level" },
    { "id": 7, "name": "Product Manager", "careerLevel": "Mid Career" }
  ]
}
```

---

## Cara Test API

### Urutan yang benar untuk test pertama kali:

```
1. POST   /api/auth/register          → daftar akun
2. POST   /api/auth/login             → login, simpan token
3. GET    /api/auth/me                → cek profile (pakai token)
4. GET    /api/roles/popular          → lihat role populer
5. PATCH  /api/auth/me/role           → pilih role (body: {"roleId": 1})
6. GET    /api/career-roadmap/default → lihat roadmap role kamu
7. GET    /api/trending-skills?year=2025           → lihat trending skills
8. GET    /api/skill-assessment/questions?role=... → ambil soal quiz
9. POST   /api/skill-assessment/submit             → submit jawaban
10. GET   /api/skill-assessment/result             → lihat hasil
```

### Cara pakai token di Postman:

1. Login dulu, copy token dari response
2. Di request berikutnya, klik tab **Authorization**
3. Pilih type **Bearer Token**
4. Paste token di kolom **Token**
5. Klik **Send**

---

## Scripts

| Command                   | Keterangan                                 |
| ------------------------- | ------------------------------------------ |
| `npm run dev`             | Jalankan server development (auto-restart) |
| `npm run build`           | Compile TypeScript ke JavaScript           |
| `npm start`               | Jalankan hasil build (production)          |
| `npm run lint`            | Cek kode dengan ESLint                     |
| `npm run format`          | Format kode dengan Prettier                |
| `npx drizzle-kit push`    | Push perubahan schema ke database          |
| `npx drizzle-kit studio`  | Buka Drizzle Studio (GUI database)         |
| `npm run seed`            | Isi data trending skills                   |
| `npm run seed:assessment` | Isi data soal quiz assessment              |
| `npm run seed:roadmap`    | Isi data career roadmap                    |

---

## Troubleshooting

### ❌ `Cannot connect to database`

- Pastikan PostgreSQL sudah berjalan
- Cek `DATABASE_URL` di `.env` — password dan nama database harus benar
- Coba buka pgAdmin atau jalankan `psql -U postgres` untuk cek koneksi

### ❌ `secretOrPrivateKey must have a value`

- `JWT_SECRET` di `.env` kosong — isi dengan string random apapun

### ❌ `Cannot find module`

- Jalankan `npm install` lagi
- Pastikan kamu ada di folder yang benar (folder yang ada `package.json`-nya)

### ❌ `relation does not exist`

- Tabel belum dibuat — jalankan `npx drizzle-kit push`

### ❌ `404 Kamu belum memilih role karier`

- Normal! Artinya user belum pilih role
- Jalankan `PATCH /api/auth/me/role` dulu dengan `{"roleId": 1}`
