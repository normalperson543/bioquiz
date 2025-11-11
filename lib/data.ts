import { prisma } from "./db";

export async function getQuiz(id: string) {
  return await prisma.quiz.findUnique({
    where: {
      id: id,
    },
    include: {
      links: true,
      owner: true,
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
}

export async function getUserFromDb(email: string, password: string) {
  const user = await prisma.profile.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}
