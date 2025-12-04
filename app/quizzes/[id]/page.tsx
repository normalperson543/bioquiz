import QuizPageUI from "@/components/ui/bq/quiz-ui";
import { getQuiz } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const currentUser = await auth();
  const quiz = await getQuiz(id);
  
  if (!quiz) {
    notFound()
  }

  if (!currentUser.isAuthenticated && quiz && quiz.lockAnswersAutomatically) {
    currentUser.redirectToSignIn({ returnBackUrl: `/quizzes/${id}` });
  }
  if ((!currentUser.isAuthenticated && quiz && !quiz.isPublic) || (currentUser.isAuthenticated && quiz && !quiz.isPublic && quiz.owner.id !== currentUser.userId)) {
    // private project, 404
    notFound()
  }

  return <QuizPageUI quiz={quiz} />;
}
