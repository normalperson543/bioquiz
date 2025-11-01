import QuizPageUI from "@/components/ui/bq/quiz-ui";
import { getQuiz } from "@/lib/data";
import { Metadata } from "next";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const quiz = await getQuiz(id);

  return <QuizPageUI quiz={quiz} />;
}
