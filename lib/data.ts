import { prisma } from "./db";

export async function getQuiz(id: string) {
  return await prisma.quiz.findUnique({
    where: {
        id: id
    },
    include: {
      links: true,
      owner: true,
      questions: {
        include: {
          options: true
        }
      },
      
    }
  })
}