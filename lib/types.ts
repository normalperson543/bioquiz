import { Prisma } from "@prisma/client";

export type QuizWithPublicInfo = Prisma.QuizGetPayload<{
  include: {
    links: true;
    owner: true;
    questions: {
      include: {
        options: {
          include: {
            answered: true
          }
        },
        answered: true
      };
    };
  };
}>;

export type OptionWithPublicInfo = Prisma.OptionGetPayload<{
  include: {
    answered: true
  }
}>
