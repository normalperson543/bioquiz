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
        orderBy: {
          dateCreated: "asc"
        }
      },
    },
  });
}

export async function getUserFromDb(id: string) {
  const user = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}