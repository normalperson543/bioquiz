"use server";

import { Option, Quiz } from "@prisma/client";
import { prisma } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
export async function markAnswered(optionId: string) {
  const user = await auth()
  if (!user.userId) throw new Error("No user")
  await prisma.option.update({
    where: {
      id: optionId
    },
    data: {
      answered: {
        connect: {
          id: user.userId
        }
      }
    }
  })
}
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
export async function createQuiz() {
  const currentUser = await auth()
  if (currentUser && currentUser.userId) {
    const quiz = await prisma.quiz.create({
      data: {
        profileId: currentUser.userId
      }
    })
    redirect(`/${quiz.id}`)
    return quiz
  } else {
    return;
  }

}
export async function updateQuiz(id: string, title: string, description: string, isPublic: boolean) {
  const updatedQuiz = await prisma.quiz.update({
    where: {
      id: id
    },
    data: {
      title: title,
      description: description,
      isPublic: isPublic
    }
  })
  return updatedQuiz
}