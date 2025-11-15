"use server";

import { Option } from "@prisma/client";
import { prisma } from "./db";

export default async function addQuestion(
  questionId: string,
  questionName: string,
  options: Option[]
) {
  const newOptions = await prisma.option.createMany({
    data: options,
  });
  const question = await prisma.question.create({
    data: {
      id: questionId,
      questionName: questionName,
    },
  });
}
