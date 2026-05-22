# Panduan Pengujian API Skill Assessment di Postman

Dokumen ini mengikuti implementasi saat ini pada `skillAssessmentRoutes`, `skillAssessmentController`, dan validator `skillAssessment`.

Base URL:

```text
http://localhost:3000
```

Semua endpoint Skill Assessment saat ini memakai middleware `protect`, jadi header `Authorization` wajib dikirim.

## Prasyarat Token

Login terlebih dahulu untuk mendapatkan JWT.

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json
```

Contoh body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Simpan nilai `token` dari response, lalu gunakan pada request Skill Assessment:

```http
Authorization: Bearer <TOKEN_JWT_KAMU>
```

## Catatan Penting Implementasi

- Query endpoint pertanyaan memakai parameter `role`, bukan `roleId` atau `roleName`.
- Payload submit memakai `selectedOption`, bukan `chosenOption`.
- Nilai opsi jawaban adalah index `0` sampai `3`.
- Response GET tidak menampilkan `correctAnswer`, sehingga untuk payload benar semua gunakan data seed atau cocokkan dengan database.
- Pada database fresh dari `seedAssessment.ts`, urutan role adalah:

```text
1  UI/UX Designer
2  Frontend Developer
3  Backend Engineer
4  Mobile Developer
5  Data Analyst / Business Intelligence
6  DevOps Engineer
7  Cybersecurity Specialist
8  IT Auditor & Governance Specialist
9  Cloud Engineer
10 AI / Machine Learning Engineer
```

Jika seeder pernah dijalankan berulang tanpa cleanup, ID bisa berbeda. Ambil `id` pertanyaan dari response GET sebelum submit.

## 1. Ambil Pertanyaan Berdasarkan Role

Endpoint:

```http
GET http://localhost:3000/api/skill-assessment/questions?role=AI%20%2F%20Machine%20Learning%20Engineer
```

Headers:

```http
Authorization: Bearer <TOKEN_JWT_KAMU>
```

Query Params di Postman:

```text
role = AI / Machine Learning Engineer
```

Contoh request role lain:

```http
GET http://localhost:3000/api/skill-assessment/questions?role=UI%2FUX%20Designer
GET http://localhost:3000/api/skill-assessment/questions?role=Frontend%20Developer
GET http://localhost:3000/api/skill-assessment/questions?role=Backend%20Engineer
GET http://localhost:3000/api/skill-assessment/questions?role=Cloud%20Engineer
```

Expected response:

```json
{
  "message": "Success",
  "role": "AI / Machine Learning Engineer",
  "total": 10,
  "data": [
    {
      "id": 91,
      "question": "Mengapa langkah Feature Scaling ...?",
      "options": [
        "A. ...",
        "B. ...",
        "C. ...",
        "D. ..."
      ],
      "skillName": "Data Preprocessing",
      "difficulty": "intermediate"
    }
  ]
}
```

Postman Tests:

```javascript
pm.test("Status 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Mengembalikan tepat 10 pertanyaan", function () {
  const json = pm.response.json();
  pm.expect(json.total).to.eql(10);
  pm.expect(json.data).to.have.length(10);
});

pm.test("Setiap pertanyaan memiliki 4 opsi", function () {
  const json = pm.response.json();
  json.data.forEach((question) => {
    pm.expect(question.options).to.have.length(4);
  });
});
```

## 2. Submit Jawaban Assessment

Endpoint:

```http
POST http://localhost:3000/api/skill-assessment/submit
```

Headers:

```http
Content-Type: application/json
Authorization: Bearer <TOKEN_JWT_KAMU>
```

Body raw JSON untuk AI / Machine Learning Engineer, benar semua, dengan asumsi database fresh dari `seedAssessment.ts`:

```json
{
  "roleId": 10,
  "answers": [
    { "questionId": 91, "selectedOption": 1 },
    { "questionId": 92, "selectedOption": 1 },
    { "questionId": 93, "selectedOption": 1 },
    { "questionId": 94, "selectedOption": 1 },
    { "questionId": 95, "selectedOption": 1 },
    { "questionId": 96, "selectedOption": 1 },
    { "questionId": 97, "selectedOption": 1 },
    { "questionId": 98, "selectedOption": 1 },
    { "questionId": 99, "selectedOption": 1 },
    { "questionId": 100, "selectedOption": 1 }
  ]
}
```

Jika ID pertanyaan berbeda, gunakan ID dari response GET. Contoh struktur yang tetap benar:

```json
{
  "roleId": 10,
  "answers": [
    { "questionId": 101, "selectedOption": 1 },
    { "questionId": 102, "selectedOption": 1 },
    { "questionId": 103, "selectedOption": 1 },
    { "questionId": 104, "selectedOption": 1 },
    { "questionId": 105, "selectedOption": 1 },
    { "questionId": 106, "selectedOption": 1 },
    { "questionId": 107, "selectedOption": 1 },
    { "questionId": 108, "selectedOption": 1 },
    { "questionId": 109, "selectedOption": 1 },
    { "questionId": 110, "selectedOption": 1 }
  ]
}
```

Expected response untuk benar semua:

```json
{
  "message": "Assessment Complete!",
  "data": {
    "user_id": 1,
    "role_applied": "AI / Machine Learning Engineer",
    "overall_match": 100,
    "level_badge": "ADVANCED",
    "skills_analysis": [
      {
        "skill_name": "Data Preprocessing",
        "score": 100,
        "status": "match",
        "display_text": "100% Match"
      }
    ]
  }
}
```

Postman Tests:

```javascript
pm.test("Status 201", function () {
  pm.response.to.have.status(201);
});

pm.test("Assessment selesai", function () {
  const json = pm.response.json();
  pm.expect(json.message).to.eql("Assessment Complete!");
});

pm.test("Benar semua menghasilkan 100% dan ADVANCED", function () {
  const json = pm.response.json();
  pm.expect(json.data.overall_match).to.eql(100);
  pm.expect(json.data.level_badge).to.eql("ADVANCED");
});
```

## Contoh Payload Salah Sebagian

Gunakan untuk memastikan grading berubah.

```json
{
  "roleId": 10,
  "answers": [
    { "questionId": 91, "selectedOption": 1 },
    { "questionId": 92, "selectedOption": 0 },
    { "questionId": 93, "selectedOption": 1 },
    { "questionId": 94, "selectedOption": 0 },
    { "questionId": 95, "selectedOption": 1 },
    { "questionId": 96, "selectedOption": 0 },
    { "questionId": 97, "selectedOption": 1 },
    { "questionId": 98, "selectedOption": 0 },
    { "questionId": 99, "selectedOption": 1 },
    { "questionId": 100, "selectedOption": 0 }
  ]
}
```

Expected behavior:

```text
totalCorrect    = 5
totalIncorrect  = 5
overall_match   = 50
level_badge     = INTERMEDIATE
```

## Error Case yang Perlu Diuji

Token tidak dikirim:

```json
{
  "message": "Token tidak ada"
}
```

Role query kosong atau salah:

```json
{
  "message": "Role wajib diisi"
}
```

Role tidak ditemukan:

```json
{
  "message": "Role \"Unknown Role\" tidak ditemukan"
}
```

Question ID tidak sesuai role:

```json
{
  "message": "Question ID tidak valid: 1, 2"
}
```

Payload salah karena memakai `chosenOption`:

```json
{
  "message": "Invalid input"
}
```

Gunakan `selectedOption` agar lolos validator.
