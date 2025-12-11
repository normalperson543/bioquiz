import { comingSoon } from "@/lib/fonts";
import { PlusIcon } from "lucide-react";
import Button from "../button";
import { createQuiz } from "@/lib/actions";
import QuizResult from "../quiz-result";
import { Quiz } from "@prisma/client";
export default function DashboardUI({
  username,
  createdQuizzes,
}: {
  username: string;
  createdQuizzes: Quiz[];
}) {
  return (
    <div className={`${comingSoon.className} flex flex-col gap-2`}>
      <div className="bg-pink-100 p-4 flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-3xl font-bold">my quiz dashboard</h2>
            <p>hi {username}, what a nice day it is to create a new quiz!</p>
          </div>
          <div className="flex flex-row gap-2">
            <Button onClick={createQuiz}>
              <PlusIcon width={16} height={16} />
              New quiz
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-2">
        <h2 className="text-2xl font-bold">my quizzes</h2>
        {createdQuizzes.map((quiz) => (
          <QuizResult
            id={quiz.id}
            name={quiz.title}
            creationDate={quiz.dateCreated}
            key={quiz.id}
          />
        ))}
      </div>
    </div>
  );
}
