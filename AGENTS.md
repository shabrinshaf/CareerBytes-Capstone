# CareerBytes Backend — Agent Guide

## Stack
- Express 5 + TypeScript + CommonJS (`"type": "commonjs"` in package.json)
- PostgreSQL + Drizzle ORM (schema: `src/db/schema.ts`)
- JWT auth + Passport (Google & GitHub OAuth)
- Zod validation, Swagger/OpenAPI docs
- ESLint + Prettier (no test framework — `npm test` is a placeholder)

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | nodemon + ts-node on `src/app.ts` |
| `npm run build` | `tsc` → `dist/app.js` |
| `npm start` | run built `dist/app.js` |
| `npm run lint` | ESLint (must pass before format) |
| `npm run format` | Prettier (after lint) |
| `npm run db:push` | Drizzle push schema to DB |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:migrate` | Drizzle migrate |
| `npm run seed` | run `src/db/seed.ts` |
| `npm run seed:trending-skills` | trending skills data |
| `npm run seed:assessment` | roles & quiz questions |
| `npm run seed:roadmap` | career roadmap data |
| `npm run seed:daily-mission` | daily mission data |

Seed order: trending-skills → assessment → roadmap → daily-mission.

## Setup
1. `cp .env.example .env` (edit `DATABASE_URL` and `JWT_SECRET`)
2. `npm install`
3. `npm run db:push`
4. Run seed commands (order matters, see above)
5. `npm run dev`

## Key Quirks
- **Drizzle config** `ssl: true` in `dbCredentials` — set to `false` for local PostgreSQL.
- **Express 5** — `res.status().json()` pattern, no `next(err)` async handler wrapping needed.
- **Swagger** reads JSDoc `@openapi` comments from `src/routes/*.ts` (OpenAPI 3.0).
- **Auth middleware** sends Indonesian error messages: `"Token tidak ada"` / `"Token tidak valid"`.
- **Role required** — user must call `PATCH /api/auth/me/role` before accessing `/api/career-roadmap/default` and daily-mission endpoints (returns 404 otherwise).
- **Daily mission submit** requires `figmaLink` OR `fileUrl`, plus all 3 `answer` fields.
- **Build output** goes to `dist/` (gitignored). Docker entrypoint: `npm run db:push && node dist/app.js`.

## API Structure
All under `/api/`:
- `auth/*` — register, login, me, role, OAuth
- `trending-skills/*` — public skills data
- `roles/*` — role search/popular
- `skill-assessment/*` — quiz questions, submit, result
- `career-roadmap/*` — roadmap by role
- `daily-mission/*` — level tasks, submissions, drafts

## Style
- Single quotes, trailing commas, semicolons, 80-char width (Prettier enforced)
- No `console.log` restrictions
- `@typescript-eslint/no-explicit-any`: warn (not error)
