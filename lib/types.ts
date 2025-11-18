import { Prisma } from "@prisma/client";

export type QuizWithPublicInfo = Prisma.QuizGetPayload<{
  include: {
    links: true;
    owner: true;
    questions: {
      include: {
        options: true
      };
    };
  };
}>;