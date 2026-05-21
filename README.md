# CareerBytes Backend

Backend REST API untuk aplikasi CareerBytes, platform yang membantu user memilih role karier teknologi, melihat skill yang sedang tren, mengerjakan assessment, dan mengikuti daily mission berdasarkan roadmap.

Dibangun dengan Express.js, TypeScript, Drizzle ORM, PostgreSQL, Passport, JWT, Zod, dan Swagger/OpenAPI.

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Setup Database](#setup-database)
- [Menjalankan Server](#menjalankan-server)
- [Dokumentasi API](#dokumentasi-api)
- [Untuk Tim Frontend](#untuk-tim-frontend)
- [Struktur Folder](#struktur-folder)
- [API Endpoints](#api-endpoints)
- [Cara Test API](#cara-test-api)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

---

## Prasyarat

Pastikan sudah install:

- Node.js LTS
- PostgreSQL
- Git
- Postman atau REST client lain

Cek versi:

```bash
node -v
psql --version
git --version
```

---

## Instalasi

Clone repository:

```bash
git clone https://github.com/Rafi-agastya/careerBytes.git
cd careerBytes
```

Install dependencies:

```bash
npm install
```

---

## Konfigurasi Environment

Buat file `.env` dari contoh:

```bash
cp .env.example .env
```

Isi `.env`:

```env
DATABASE_URL=postgresql://postgres:password_kamu@localhost:5432/careerbytes

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

JWT_SECRET=isi_dengan_string_random_yang_panjang

CLIENT_URL=http://localhost:5173
PORT=3000
```

Catatan:

- Ganti `password_kamu` sesuai password PostgreSQL lokal.
- `JWT_SECRET` wajib diisi.
- `CLIENT_URL` adalah alamat frontend. Default Vite biasanya `http://localhost:5173`.
- Google/GitHub OAuth boleh dikosongkan kalau fitur OAuth belum dipakai.

---

## Setup Database

Buat database PostgreSQL:

```bash
psql -U postgres
```

```sql
CREATE DATABASE careerbytes;
\q
```

Push schema Drizzle:

```bash
npm run db:push
```

Seed data awal:

```bash
npm run seed:trending-skills
npm run seed:assessment
npm run seed:roadmap
npm run seed:daily-mission
```

Catatan:

- `npm run seed` juga tersedia dan mengarah ke `src/db/seed.ts`.
- Untuk setup lengkap fitur terbaru, jalankan seed trending skills, assessment, roadmap, lalu daily mission.

---

## Menjalankan Server

Mode development:

```bash
npm run dev
```

Kalau berhasil:

```text
[nodemon] starting `ts-node src/app.ts`
Server running on PORT 3000
Database Connected (Drizzle Ready)
```

Server berjalan di:

```text
http://localhost:3000
```

Catatan penting:

- Project ini adalah backend API, bukan frontend.
- Root URL `/` tidak punya halaman khusus.
- Buka dokumentasi API di `/api/docs/`.

Build dan run production lokal:

```bash
npm run build
npm start
```

---

## Dokumentasi API

Dokumentasi interaktif menggunakan Swagger UI.

```text
http://localhost:3000/api/docs/
```

Swagger dibuat dari:

- `src/config/swagger.ts`
- komentar OpenAPI di `src/routes/*.ts`
- mount route di `src/app.ts`

Kalau membuka `/api/docs/` muncul `Cannot GET`, biasanya server yang sedang berjalan bukan server dari code terbaru, atau port `3000` sedang dipakai proses Node lama.

---

## Untuk Tim Frontend

Frontend perlu backend yang sedang berjalan supaya bisa memanggil API dan membuka Swagger.

Kalau frontend dan backend jalan di laptop yang sama, jalankan dua terminal:

```bash
# Terminal backend
npm run dev
```

```bash
# Terminal frontend, dari folder frontend
npm run dev
```

Alamat lokal:

```text
Backend API : http://localhost:3000
Frontend    : http://localhost:5173
Swagger Docs: http://localhost:3000/api/docs/
```

Environment frontend:

```env
VITE_API_URL=http://localhost:3000
```

Contoh fetch:

```ts
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/trending-skills`);
const data = await response.json();
```

Untuk endpoint yang butuh login:

```ts
const response = await fetch(`${API_URL}/api/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Kalau frontend jalan di laptop berbeda, `localhost` menunjuk ke laptop masing-masing. Jadi frontend tidak bisa akses `http://localhost:3000` di laptop backend kecuali backend-nya dibuat bisa diakses publik atau frontend menjalankan backend sendiri.

Pilihan untuk beda laptop:

1. Frontend clone repo backend ini dan jalankan backend lokal sendiri.
2. Backend di-deploy ke server publik, lalu frontend memakai URL deploy.
3. Untuk demo sementara, expose backend lokal dengan tunnel seperti ngrok atau Cloudflare Tunnel.

Kalau sudah deploy:

```env
VITE_API_URL=https://url-backend-kamu
```

Swagger deploy:

```text
https://url-backend-kamu/api/docs/
```

---

## Struktur Folder

```text
src/
├── app.ts                          # Entry point Express
├── config/
│   ├── db.ts                       # Koneksi Drizzle/PostgreSQL
│   ├── passport.ts                 # OAuth Google/GitHub
│   └── swagger.ts                  # Konfigurasi OpenAPI
├── controllers/
│   ├── authController.ts
│   ├── careerRoadmapController.ts
│   ├── dailyMissionController.ts
│   ├── skillAssessmentController.ts
│   └── trendingSkillsController.ts
├── db/
│   ├── schema.ts                   # Schema database Drizzle
│   ├── fixRolesTable.ts            # Script utilitas roles
│   ├── seed.ts
│   ├── seedTrendingSkills.ts
│   ├── seedAssessment.ts
│   ├── seedRoadmap.ts
│   ├── seedDailyMission.ts
│   └── trendingSkillsSeedData.ts
├── middlewares/
│   ├── authMiddleware.ts           # JWT protect middleware
│   └── validationMiddleware.ts     # Validasi Zod
├── routes/
│   ├── authRoutes.ts               # /api/auth/*
│   ├── careerRoadmapRoutes.ts      # /api/career-roadmap/*
│   ├── dailyMissionRoutes.ts       # /api/daily-mission/*
│   ├── rolesRoutes.ts              # /api/roles/*
│   ├── skillAssessmentRoutes.ts    # /api/skill-assessment/*
│   └── trendingSkillsRoutes.ts     # /api/trending-skills/*
└── validators/
    ├── authSchema.ts
    ├── careerRoadmap.ts
    ├── dailyMission.ts
    ├── skillAssessment.ts
    └── trendingSkills.ts
```

---

## API Endpoints

Header untuk endpoint yang butuh login:

```http
Authorization: Bearer <token>
```

Endpoint publik:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/github`
- `GET /api/trending-skills`
- `GET /api/trending-skills/jobs`

### Authentication

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Tidak | Register user baru |
| `POST` | `/api/auth/login` | Tidak | Login dan mendapatkan JWT token |
| `GET` | `/api/auth/me` | Ya | Ambil profil user login |
| `PATCH` | `/api/auth/me/role` | Ya | Pilih role karier user |
| `GET` | `/api/auth/google` | Tidak | Redirect ke login Google |
| `GET` | `/api/auth/google/callback` | Tidak | Callback OAuth Google |
| `GET` | `/api/auth/github` | Tidak | Redirect ke login GitHub |
| `GET` | `/api/auth/github/callback` | Tidak | Callback OAuth GitHub |

Body register:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

Body login:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Body pilih role:

```json
{
  "roleId": 1
}
```

### Trending Skills

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/trending-skills` | Tidak | Ambil semua trending skills |
| `GET` | `/api/trending-skills?year=2025` | Tidak | Filter trending skills berdasarkan tahun |
| `GET` | `/api/trending-skills/jobs` | Tidak | Ambil daftar nama skill unik |
| `GET` | `/api/trending-skills/periods` | Ya | Ambil daftar tahun yang tersedia |

### Roles

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/roles?query=frontend` | Ya | Cari role berdasarkan keyword |
| `GET` | `/api/roles/popular` | Ya | Ambil daftar role populer |

### Skill Assessment

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/skill-assessment/questions?role=Frontend Developer` | Ya | Ambil soal quiz berdasarkan nama role |
| `POST` | `/api/skill-assessment/submit` | Ya | Submit jawaban quiz |
| `GET` | `/api/skill-assessment/result` | Ya | Ambil hasil assessment terakhir |

Body submit assessment:

```json
{
  "roleId": 2,
  "answers": [
    { "questionId": 1, "selectedOption": 0 },
    { "questionId": 2, "selectedOption": 3 }
  ]
}
```

### Career Roadmap

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/career-roadmap?role=UI/UX Designer` | Ya | Ambil roadmap berdasarkan nama role |
| `GET` | `/api/career-roadmap/default` | Ya | Ambil roadmap berdasarkan role yang dipilih user |

`/api/career-roadmap/default` return `404` kalau user belum memilih role lewat `PATCH /api/auth/me/role`.

### Daily Mission

Semua endpoint daily mission membutuhkan JWT token.

| Method | Endpoint | Auth | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/daily-mission/roadmap/:roleId` | Ya | Ambil level roadmap, progress user, dan status lock/unlock |
| `GET` | `/api/daily-mission/tasks/:roadmapLevelId` | Ya | Ambil task untuk satu level roadmap |
| `GET` | `/api/daily-mission/task/:taskId` | Ya | Ambil detail task, instruksi, requirements, dan pertanyaan |
| `POST` | `/api/daily-mission/task/:taskId/submit` | Ya | Submit final task dan update progress |
| `POST` | `/api/daily-mission/task/:taskId/draft` | Ya | Simpan draft task tanpa menaikkan progress |

Body submit task:

```json
{
  "figmaLink": "https://figma.com/file/example",
  "fileUrl": null,
  "answer1": "Jawaban refleksi pertama",
  "answer2": "Jawaban refleksi kedua",
  "answer3": "Jawaban refleksi ketiga"
}
```

Submit final wajib menyertakan minimal `figmaLink` atau `fileUrl`, dan semua `answer1`, `answer2`, `answer3` harus terisi.

---

## Cara Test API

Urutan test pertama kali:

```text
1. POST   /api/auth/register
2. POST   /api/auth/login
3. GET    /api/auth/me
4. GET    /api/roles/popular
5. PATCH  /api/auth/me/role
6. GET    /api/career-roadmap/default
7. GET    /api/trending-skills?year=2025
8. GET    /api/skill-assessment/questions?role=Frontend Developer
9. POST   /api/skill-assessment/submit
10. GET   /api/skill-assessment/result
11. GET   /api/daily-mission/roadmap/:roleId
12. GET   /api/daily-mission/tasks/:roadmapLevelId
13. GET   /api/daily-mission/task/:taskId
14. POST  /api/daily-mission/task/:taskId/draft
15. POST  /api/daily-mission/task/:taskId/submit
```

Cara pakai token di Postman:

1. Login atau register dulu.
2. Copy `token` dari response.
3. Buka tab Authorization.
4. Pilih type `Bearer Token`.
5. Paste token.
6. Send request ke endpoint yang butuh auth.

---

## Scripts

| Command | Keterangan |
| --- | --- |
| `npm run dev` | Jalankan server development dengan nodemon |
| `npm run build` | Compile TypeScript ke `dist/` |
| `npm start` | Jalankan hasil build dari `dist/app.js` |
| `npm run lint` | Cek kode dengan ESLint |
| `npm run format` | Format kode dengan Prettier |
| `npm run db:push` | Push schema Drizzle ke database |
| `npm run db:studio` | Buka Drizzle Studio |
| `npm run seed` | Jalankan `src/db/seed.ts` |
| `npm run seed:trending-skills` | Isi data trending skills |
| `npm run seed:assessment` | Isi data roles dan quiz assessment |
| `npm run seed:roadmap` | Isi data career roadmap |
| `npm run seed:daily-mission` | Isi data daily mission |

---

## Troubleshooting

### `Cannot connect to database`

- Pastikan PostgreSQL berjalan.
- Cek `DATABASE_URL` di `.env`.
- Pastikan database sudah dibuat.
- Jalankan `npm run db:push`.

### `secretOrPrivateKey must have a value`

`JWT_SECRET` belum diisi di `.env`.

### `Cannot find module`

Jalankan:

```bash
npm install
```

Pastikan terminal berada di folder yang memiliki `package.json`.

### `relation does not exist`

Tabel belum dibuat. Jalankan:

```bash
npm run db:push
```

### `Cannot GET /`

Normal. Backend ini tidak menyediakan halaman root. Buka:

```text
http://localhost:3000/api/docs/
```

### `Cannot GET /api/docs/`

Kemungkinan server yang berjalan bukan code terbaru, atau port `3000` dipakai proses lama.

Solusi Windows:

```powershell
taskkill /F /IM node.exe
npm run dev
```

### `404 Kamu belum memilih role karier`

User belum memilih role. Jalankan:

```http
PATCH /api/auth/me/role
```

Body:

```json
{
  "roleId": 1
}
```
