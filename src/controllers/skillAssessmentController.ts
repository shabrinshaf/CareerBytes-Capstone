import { desc, eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../config/db';
import { quizAnswers, quizQuestions, quizResults, roles } from '../db/schema';
import {
  roleQuerySchema,
  submitAnswerSchema,
} from '../validators/skillAssessment';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerMeta = {
  score?: number | null;
  isCorrect?: number | null;
  skillName: string;
  difficulty: string;
  questionType: string;
};

const calculateSkillGap = (answers: AnswerMeta[]) => {
  const thresholds: Record<string, number> = {
    basic: 2,
    intermediate: 3,
    advanced: 4,
  };

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const skillLevels: Record<string, string> = {};
  const skillComparison: Record<
    string,
    { yourScore: number; targetScore: number; status: string }
  > = {};

  let totalScore = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;

  answers.forEach(
    ({ score, isCorrect, skillName, difficulty, questionType }) => {
      if (questionType === 'rating' && score != null) {
        totalScore += score;

        const level =
          score <= 2 ? 'basic' : score === 3 ? 'intermediate' : 'advanced';
        skillLevels[skillName] = level;

        const threshold = thresholds[difficulty];
        const yourScorePercent = Math.round((score / 5) * 100);
        const targetScorePercent = Math.round((threshold / 5) * 100);

        skillComparison[skillName] = {
          yourScore: yourScorePercent,
          targetScore: targetScorePercent,
          status: score >= threshold ? 'match' : 'gap',
        };

        if (score >= threshold) {
          if (!matchedSkills.includes(skillName)) matchedSkills.push(skillName);
        } else {
          if (!missingSkills.includes(skillName)) missingSkills.push(skillName);
        }
      }

      if (questionType === 'essay' && isCorrect != null) {
        if (isCorrect === 1) totalCorrect++;
        else totalIncorrect++;
      }
    },
  );

  const ratingAnswers = answers.filter((a) => a.questionType === 'rating');
  const overallScore =
    ratingAnswers.length > 0
      ? Math.round((totalScore / ratingAnswers.length) * 20)
      : 0;

  return {
    overallScore,
    matchedSkills,
    missingSkills,
    skillLevels,
    skillComparison,
    totalCorrect,
    totalIncorrect,
  };
};

// ─── GET /api/skill-assessment/questions?role=UI/UX Designer ─────────────────

export const getQuestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = roleQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: parsed.error.issues[0]?.message ?? 'Invalid query' });
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
        skillName: q.skillName,
        difficulty: q.difficulty,
        questionType: q.questionType,
        scenario: q.scenario,
        hint: q.hint,
        // correctAnswer sengaja tidak di-expose ke frontend
      })),
    });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── POST /api/skill-assessment/submit ───────────────────────────────────────

export const submitAssessment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = submitAnswerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: parsed.error.issues[0]?.message ?? 'Invalid input',
      });
      return;
    }

    const { roleId, answers } = parsed.data;
    const userId = (req.user as { id: number }).id;

    const validQuestions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.roleId, roleId));

    const validIds = validQuestions.map((q) => q.id);
    const invalidIds = answers
      .map((a) => a.questionId)
      .filter((id) => !validIds.includes(id));

    if (invalidIds.length > 0) {
      res.status(400).json({
        message: `Question ID tidak valid: ${invalidIds.join(', ')}`,
      });
      return;
    }

    const answersWithMeta = answers.map((answer) => {
      const question = validQuestions.find((q) => q.id === answer.questionId)!;

      let isCorrect: number | null = null;
      if (
        question.questionType === 'essay' &&
        answer.essayAnswer &&
        question.correctAnswer
      ) {
        const keywords = question.correctAnswer
          .toLowerCase()
          .split(' ')
          .filter((w) => w.length > 4);
        const userAnswer = answer.essayAnswer.toLowerCase();
        const matchCount = keywords.filter((k) =>
          userAnswer.includes(k),
        ).length;
        isCorrect = matchCount >= keywords.length * 0.3 ? 1 : 0;
      }

      return {
        score: answer.score ?? null,
        essayAnswer: answer.essayAnswer ?? null,
        isCorrect,
        skillName: question.skillName,
        difficulty: question.difficulty,
        questionType: question.questionType,
        questionId: answer.questionId,
        explanation: question.explanation,
        correctAnswer: question.correctAnswer,
      };
    });

    const {
      overallScore,
      matchedSkills,
      missingSkills,
      skillLevels,
      skillComparison,
      totalCorrect,
      totalIncorrect,
    } = calculateSkillGap(answersWithMeta);

    const result = await db
      .insert(quizResults)
      .values({
        userId,
        roleId,
        overallScore,
        matchedSkills,
        missingSkills,
        skillLevels,
        skillComparison,
        totalCorrect,
        totalIncorrect,
      })
      .returning();

    await db.insert(quizAnswers).values(
      answersWithMeta.map((a) => ({
        resultId: result[0].id,
        questionId: a.questionId,
        score: a.score,
        essayAnswer: a.essayAnswer,
        isCorrect: a.isCorrect,
      })),
    );

    res.status(201).json({
      message: 'Assessment Complete!',
      data: {
        overallScore,
        totalCorrect,
        totalIncorrect,
        matchedSkills,
        missingSkills,
        skillLevels,
        skillComparison,
        answerReview: answersWithMeta.map((a) => ({
          questionId: a.questionId,
          skillName: a.skillName,
          questionType: a.questionType,
          isCorrect: a.isCorrect,
          explanation: a.explanation,
          correctAnswer: a.questionType === 'essay' ? a.correctAnswer : null,
        })),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET /api/skill-assessment/result ────────────────────────────────────────

export const getResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as { id: number }).id;

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

    res.json({ message: 'Success', data: result[0] });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
};
