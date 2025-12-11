import { Prisma } from "@prisma/client";

export type QuizWithPublicInfo = Prisma.QuizGetPayload<{
  include: {
    links: true;
    owner: true;
    questions: {
      include: {
        options: {
          include: {
            answered: true;
          };
        };
        comments: {
          include: {
            user: true;
          };
        };
        answered: true;
      };
    };
  };
}>;

export type OptionWithPublicInfo = Prisma.OptionGetPayload<{
  include: {
    answered: true;
  };
}>;

export type CommentWithPublicInfo = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;
