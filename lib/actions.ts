"use server";

import { Option } from "@prisma/client";
import { prisma } from "./db";

export async function addQuestion(
  questionId: string,
  questionName: string,
  options: Option[],
  correctAnswer: string,
  correctAnswerExplanation: string,
  quizId: string
) {
  console.log(options);
  await prisma.question.create({
    data: {
      id: questionId,
      questionName: questionName,
      correctAnswer: correctAnswer,
      correctAnswerExplanation: correctAnswerExplanation,
      quizId: quizId,
    },
  });
  await prisma.option.createMany({
    data: options,
  });
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      options: true,
    },
  });

  return question;
}
export async function markAnswered(questionId: string) {}
export async function updateQuestion(
  questionId: string,
  questionName: string,
  options: Option[],
  correctAnswer: string,
  correctAnswerExplanation: string,
  quizId: string
) {
  console.log(options);
  await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      questionName: questionName,
      correctAnswer: correctAnswer,
      correctAnswerExplanation: correctAnswerExplanation,
      quizId: quizId,
    },
  });
  await prisma.option.deleteMany({
    where: {
      questionId: questionId,
    },
  });
  await prisma.option.createMany({
    data: options,
  });
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      options: true,
    },
  });

  return question;
}
