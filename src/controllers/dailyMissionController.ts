import { and, eq, count } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../config/db';
import {
  missionTasks,
  roadmapLevels,
  roles,
  userTaskSubmissions,
} from '../db/schema';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PASS_THRESHOLD = 100; // harus selesaikan semua task untuk unlock level berikutnya

/**
 * Hitung progress satu level untuk seorang user.
 * progress = jumlah task submitted / total task × 100
 */
const calcLevelProgress = async (
  userId: number,
  roadmapLevelId: number,
): Promise<{ submitted: number; total: number; percent: number }> => {
  const [totalRow] = await db
    .select({ count: count() })
    .from(missionTasks)
    .where(
      and(
        eq(missionTasks.roadmapLevelId, roadmapLevelId),
        eq(missionTasks.isActive, true),
      ),
    );

  const [submittedRow] = await db
    .select({ count: count() })
    .from(userTaskSubmissions)
    .where(
      and(
        eq(userTaskSubmissions.userId, userId),
        eq(userTaskSubmissions.roadmapLevelId, roadmapLevelId),
        eq(userTaskSubmissions.status, 'submitted'),
      ),
    );

  const total = totalRow?.count ?? 0;
  const submitted = submittedRow?.count ?? 0;
  const percent = total > 0 ? Math.round((submitted / total) * 100) : 0;

  return { submitted, total, percent };
};

// ─── GET /api/daily-mission/roadmap/:roleId ───────────────────────────────────
// Ambil semua level roadmap beserta progress user & status lock/unlock.

export const getRoadmapWithProgress = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;
    const roleId = parseInt(req.params.roleId as string, 10);

    if (isNaN(roleId)) {
      res.status(400).json({ message: 'roleId tidak valid' });
      return;
    }

    const [role] = await db.select().from(roles).where(eq(roles.id, roleId));

    if (!role) {
      res.status(404).json({ message: 'Role tidak ditemukan' });
      return;
    }

    const levels = await db
      .select()
      .from(roadmapLevels)
      .where(eq(roadmapLevels.roleId, roleId))
      .orderBy(roadmapLevels.order);

    // Hitung progress tiap level & tentukan status unlock
    const levelsWithProgress = [];
    let previousLevelCompleted = true; // level pertama selalu unlocked

    for (const lvl of levels) {
      const progress = await calcLevelProgress(userId, lvl.id);

      const isUnlocked = previousLevelCompleted;
      const isCompleted = progress.percent === PASS_THRESHOLD;

      levelsWithProgress.push({
        id: lvl.id,
        level: lvl.level,
        levelLabel: lvl.levelLabel,
        description: lvl.description,
        skills: lvl.skills,
        tools: lvl.tools,
        order: lvl.order,
        isUnlocked,
        isCompleted,
        progress: {
          submitted: progress.submitted,
          total: progress.total,
          percent: progress.percent,
        },
      });

      // Level berikutnya hanya unlock kalau level ini 100%
      previousLevelCompleted = isCompleted;
    }

    res.json({
      message: 'Success',
      data: {
        role: {
          id: role.id,
          name: role.name,
          description: role.description,
          careerLevel: role.careerLevel,
          estimateYears: role.estimateYears,
        },
        levels: levelsWithProgress,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/daily-mission/tasks/:roadmapLevelId ────────────────────────────
// Ambil 5 task untuk satu level, beserta status submitted user.

export const getTasksByLevel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;
    const roadmapLevelId = parseInt(req.params.roadmapLevelId as string, 10);

    if (isNaN(roadmapLevelId)) {
      res.status(400).json({ message: 'roadmapLevelId tidak valid' });
      return;
    }

    const [level] = await db
      .select()
      .from(roadmapLevels)
      .where(eq(roadmapLevels.id, roadmapLevelId));

    if (!level) {
      res.status(404).json({ message: 'Level tidak ditemukan' });
      return;
    }

    // Cek apakah level ini unlocked untuk user
    // (semua level sebelumnya harus 100%)
    const allLevels = await db
      .select()
      .from(roadmapLevels)
      .where(eq(roadmapLevels.roleId, level.roleId))
      .orderBy(roadmapLevels.order);

    for (const prevLvl of allLevels) {
      if (prevLvl.order >= level.order) break;
      const progress = await calcLevelProgress(userId, prevLvl.id);
      if (progress.percent < PASS_THRESHOLD) {
        res.status(403).json({
          message: `Selesaikan ${prevLvl.levelLabel} terlebih dahulu (progress: ${progress.percent}%)`,
        });
        return;
      }
    }

    const tasks = await db
      .select()
      .from(missionTasks)
      .where(
        and(
          eq(missionTasks.roadmapLevelId, roadmapLevelId),
          eq(missionTasks.isActive, true),
        ),
      )
      .orderBy(missionTasks.order);

    // Ambil submissions user untuk level ini
    const submissions = await db
      .select({ taskId: userTaskSubmissions.taskId })
      .from(userTaskSubmissions)
      .where(
        and(
          eq(userTaskSubmissions.userId, userId),
          eq(userTaskSubmissions.roadmapLevelId, roadmapLevelId),
          eq(userTaskSubmissions.status, 'submitted'),
        ),
      );

    const submittedTaskIds = new Set(submissions.map((s) => s.taskId));

    const progress = await calcLevelProgress(userId, roadmapLevelId);

    res.json({
      message: 'Success',
      data: {
        level: {
          id: level.id,
          level: level.level,
          levelLabel: level.levelLabel,
          description: level.description,
        },
        progress,
        tasks: tasks.map((t) => ({
          id: t.id,
          order: t.order,
          title: t.title,
          category: t.category,
          difficulty: t.difficulty,
          durationMinutes: t.durationMinutes,
          isSubmitted: submittedTaskIds.has(t.id),
        })),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/daily-mission/task/:taskId ─────────────────────────────────────
// Detail satu task (instruksi, requirements, pertanyaan).

export const getTaskDetail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;
    const taskId = parseInt(req.params.taskId as string, 10);

    if (isNaN(taskId)) {
      res.status(400).json({ message: 'taskId tidak valid' });
      return;
    }

    const [task] = await db
      .select()
      .from(missionTasks)
      .where(and(eq(missionTasks.id, taskId), eq(missionTasks.isActive, true)));

    if (!task) {
      res.status(404).json({ message: 'Task tidak ditemukan' });
      return;
    }

    // Cek apakah user sudah submit task ini
    const [existingSubmission] = await db
      .select()
      .from(userTaskSubmissions)
      .where(
        and(
          eq(userTaskSubmissions.userId, userId),
          eq(userTaskSubmissions.taskId, taskId),
          eq(userTaskSubmissions.status, 'submitted'),
        ),
      );

    res.json({
      message: 'Success',
      data: {
        id: task.id,
        order: task.order,
        title: task.title,
        category: task.category,
        difficulty: task.difficulty,
        durationMinutes: task.durationMinutes,
        description: task.description,
        learningGoal: task.learningGoal,
        instructions: task.instructions,
        requirements: task.requirements,
        hint: task.hint,
        acceptsFigmaLink: task.acceptsFigmaLink,
        acceptsFileUpload: task.acceptsFileUpload,
        questions: [task.question1, task.question2, task.question3],
        isSubmitted: !!existingSubmission,
        submission: existingSubmission
          ? {
              figmaLink: existingSubmission.figmaLink,
              fileUrl: existingSubmission.fileUrl,
              answers: [
                existingSubmission.answer1,
                existingSubmission.answer2,
                existingSubmission.answer3,
              ],
              submittedAt: existingSubmission.submittedAt,
            }
          : null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── POST /api/daily-mission/task/:taskId/submit ──────────────────────────────
// Submit satu task. Score dihitung dari akumulasi: tasks selesai / total × 100.

export const submitTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;
    const taskId = parseInt(req.params.taskId as string, 10);

    if (isNaN(taskId)) {
      res.status(400).json({ message: 'taskId tidak valid' });
      return;
    }

    if (!req.body || typeof req.body !== 'object') {
      res.status(400).json({
        message:
          'Request body tidak valid. Pastikan Content-Type: application/json',
      });
      return;
    }

    const { figmaLink, fileUrl, answer1, answer2, answer3 } = req.body;

    // Validasi minimal ada satu bukti kerja
    if (!figmaLink && !fileUrl) {
      res.status(400).json({
        message:
          'Wajib menyertakan Figma link atau upload file sebagai bukti kerja',
      });
      return;
    }

    // Validasi semua jawaban essay ada
    if (!answer1 || !answer2 || !answer3) {
      res.status(400).json({ message: 'Semua pertanyaan harus dijawab' });
      return;
    }

    const [task] = await db
      .select()
      .from(missionTasks)
      .where(and(eq(missionTasks.id, taskId), eq(missionTasks.isActive, true)));

    if (!task) {
      res.status(404).json({ message: 'Task tidak ditemukan' });
      return;
    }

    // Cek apakah sudah pernah submit
    const [existing] = await db
      .select()
      .from(userTaskSubmissions)
      .where(
        and(
          eq(userTaskSubmissions.userId, userId),
          eq(userTaskSubmissions.taskId, taskId),
          eq(userTaskSubmissions.status, 'submitted'),
        ),
      );

    if (existing) {
      res
        .status(400)
        .json({ message: 'Task ini sudah kamu submit sebelumnya' });
      return;
    }

    // Cek level unlock
    const [level] = await db
      .select()
      .from(roadmapLevels)
      .where(eq(roadmapLevels.id, task.roadmapLevelId));

    if (!level) {
      res.status(404).json({ message: 'Level tidak ditemukan' });
      return;
    }

    const allLevels = await db
      .select()
      .from(roadmapLevels)
      .where(eq(roadmapLevels.roleId, level.roleId))
      .orderBy(roadmapLevels.order);

    for (const prevLvl of allLevels) {
      if (prevLvl.order >= level.order) break;
      const progress = await calcLevelProgress(userId, prevLvl.id);
      if (progress.percent < PASS_THRESHOLD) {
        res.status(403).json({
          message: `Selesaikan ${prevLvl.levelLabel} terlebih dahulu`,
        });
        return;
      }
    }

    // Simpan submission
    await db.insert(userTaskSubmissions).values({
      userId,
      taskId,
      roadmapLevelId: task.roadmapLevelId,
      figmaLink: figmaLink ?? null,
      fileUrl: fileUrl ?? null,
      answer1,
      answer2,
      answer3,
      status: 'submitted',
    });

    // Hitung progress terbaru setelah submit
    const progress = await calcLevelProgress(userId, task.roadmapLevelId);
    const isLevelCompleted = progress.percent === PASS_THRESHOLD;

    res.status(201).json({
      message: `Task berhasil di-submit! 🎉`,
      data: {
        taskId,
        taskTitle: task.title,
        levelProgress: {
          submitted: progress.submitted,
          total: progress.total,
          percent: progress.percent,
        },
        isLevelCompleted,
        // Info untuk update roadmap bar di frontend
        roadmapLevelId: task.roadmapLevelId,
        nextLevelUnlocked: isLevelCompleted,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── POST /api/daily-mission/task/:taskId/draft ───────────────────────────────
// Simpan draft (belum submit, progress belum naik).

export const saveDraft = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;
    const taskId = parseInt(req.params.taskId as string, 10);

    if (isNaN(taskId)) {
      res.status(400).json({ message: 'taskId tidak valid' });
      return;
    }

    if (!req.body || typeof req.body !== 'object') {
      res
        .status(400)
        .json({
          message:
            'Request body tidak valid. Pastikan Content-Type: application/json',
        });
      return;
    }

    const { figmaLink, fileUrl, answer1, answer2, answer3 } = req.body;

    const [task] = await db
      .select({
        id: missionTasks.id,
        roadmapLevelId: missionTasks.roadmapLevelId,
      })
      .from(missionTasks)
      .where(and(eq(missionTasks.id, taskId), eq(missionTasks.isActive, true)));

    if (!task) {
      res.status(404).json({ message: 'Task tidak ditemukan' });
      return;
    }

    // Cek apakah sudah ada draft/submission sebelumnya
    const [existing] = await db
      .select()
      .from(userTaskSubmissions)
      .where(
        and(
          eq(userTaskSubmissions.userId, userId),
          eq(userTaskSubmissions.taskId, taskId),
        ),
      );

    if (existing?.status === 'submitted') {
      res.status(400).json({
        message: 'Task ini sudah di-submit, tidak bisa di-draft lagi',
      });
      return;
    }

    if (existing) {
      // Update draft yang ada
      await db
        .update(userTaskSubmissions)
        .set({
          figmaLink: figmaLink ?? null,
          fileUrl: fileUrl ?? null,
          answer1: answer1 ?? '',
          answer2: answer2 ?? '',
          answer3: answer3 ?? '',
        })
        .where(eq(userTaskSubmissions.id, existing.id));
    } else {
      // Buat draft baru
      await db.insert(userTaskSubmissions).values({
        userId,
        taskId,
        roadmapLevelId: task.roadmapLevelId,
        figmaLink: figmaLink ?? null,
        fileUrl: fileUrl ?? null,
        answer1: answer1 ?? '',
        answer2: answer2 ?? '',
        answer3: answer3 ?? '',
        status: 'draft',
      });
    }

    res.json({ message: 'Draft tersimpan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
