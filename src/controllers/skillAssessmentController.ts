import { Request, Response } from 'express';
import { db } from '../config/db';
import { quizQuestions, quizResults, quizAnswers, roles } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { submitAnswerSchema, roleQuerySchema } from '../validators/skillAssessment';

const getLevelBadge = (overallMatch: number): string => {
  if (overallMatch >= 80) return 'ADVANCED';
  if (overallMatch >= 50) return 'INTERMEDIATE';
  return 'BEGINNER';
};

const calculateSkillAnalysis = (
  answers: { skillName: string; isCorrect: number }[]
) => {
  const groups: Record<string, { correct: number; total: number }> = {};
  answers.forEach((a) => {
    if (!groups[a.skillName]) groups[a.skillName] = { correct: 0, total: 0 };
    groups[a.skillName].total++;
    if (a.isCorrect) groups[a.skillName].correct++;
  });

  return Object.entries(groups).map(([skillName, data]) => {
    const pct = (data.correct / data.total) * 100;
    const score = Math.round(pct * 10) / 10;
    const status = score >= 70 ? 'match' : 'gap';
    const displayText =
      status === 'match'
        ? `${score}% Match`
        : `${Math.round((100 - pct) * 10) / 10}% Gap`;
    return { skill_name: skillName, score, status, display_text: displayText };
  });
};

// GET /api/skill-assessment/questions?role=UI/UX Designer
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = roleQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid query' });
      return;
    }

    const { role } = parsed.data;
    const roleData = await db.select().from(roles).where(eq(roles.name, role));
    if (roleData.length === 0) {
      res.status(404).json({ message: `Role "${role}" tidak ditemukan` });
      return;
    }

    const questions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.roleId, roleData[0].id));

    res.json({
      message: 'Success',
      role: roleData[0].name,
      total: questions.length,
      data: questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        skillName: q.skillName,
        difficulty: q.difficulty,
      })),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/skill-assessment/submit
export const submitAssessment = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = submitAnswerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid input' });
      return;
    }

    const { roleId, answers } = parsed.data;
    const userId = req.user?.id as number;

    const questions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.roleId, roleId));

    const validIds = questions.map((q) => q.id);
    const invalidIds = answers.map((a) => a.questionId).filter((id) => !validIds.includes(id));
    if (invalidIds.length > 0) {
      res.status(400).json({ message: `Question ID tidak valid: ${invalidIds.join(', ')}` });
      return;
    }

    // Grade each answer
    const graded = answers.map((a) => {
      const q = questions.find((qq) => qq.id === a.questionId)!;
      const isCorrect = a.selectedOption === q.correctAnswer ? 1 : 0;
      return { questionId: a.questionId, selectedOption: a.selectedOption, isCorrect, skillName: q.skillName };
    });

    const totalCorrect = graded.filter((g) => g.isCorrect).length;
    const totalIncorrect = graded.length - totalCorrect;
    const overallMatch = Math.round((totalCorrect / graded.length) * 100);
    const levelBadge = getLevelBadge(overallMatch);
    const skillsAnalysis = calculateSkillAnalysis(graded);

    const roleData = await db.select().from(roles).where(eq(roles.id, roleId));
    const roleName = roleData.length > 0 ? roleData[0].name : 'Unknown';

    // Save result
    const result = await db
      .insert(quizResults)
      .values({
        userId,
        roleId,
        overallMatch,
        levelBadge,
        skillsAnalysis,
        totalCorrect,
        totalIncorrect,
      })
      .returning();

    // Save answers
    await db.insert(quizAnswers).values(
      graded.map((g) => ({
        resultId: result[0].id,
        questionId: g.questionId,
        selectedOption: g.selectedOption,
        isCorrect: g.isCorrect,
      }))
    );

    res.status(201).json({
      message: 'Assessment Complete!',
      data: {
        user_id: userId,
        role_applied: roleName,
        overall_match: overallMatch,
        level_badge: levelBadge,
        skills_analysis: skillsAnalysis,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/skill-assessment/result
export const getResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id as number;
    const result = await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
      .orderBy(desc(quizResults.createdAt))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ message: 'Belum ada hasil assessment' });
      return;
    }

    const roleData = await db.select().from(roles).where(eq(roles.id, result[0].roleId));
    const roleName = roleData.length > 0 ? roleData[0].name : 'Unknown';

    res.json({
      message: 'Success',
      data: {
        user_id: result[0].userId,
        role_applied: roleName,
        overall_match: result[0].overallMatch,
        level_badge: result[0].levelBadge,
        skills_analysis: result[0].skillsAnalysis,
      },
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};
