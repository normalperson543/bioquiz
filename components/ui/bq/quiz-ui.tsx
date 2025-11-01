"use client";

import { comingSoon } from "@/lib/fonts";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import { Profile, Quiz } from "@prisma/client";
import { QuizWithPublicInfo } from "@/lib/types";
import QuizLink from "./quiz-link";
import { linkTypes } from "@/lib/constants";
import QuestionCard from "./question-card";
import { MailIcon, PhoneIcon } from "lucide-react";

export default function QuizPageUI({ quiz }: { quiz: QuizWithPublicInfo }) {
  return (
    <div
      className={`w-full h-full bg-pink-50 text-black ${comingSoon.className}`}
    >
      <div className="flex flex-row gap-2 w-full pl-12 pr-12 pt-16 pb-16 rounded-sm bg-pink-100 items-center">
        <div className="flex flex-1 flex-row gap-4 items-center">
          <Image
            src={
              quiz.owner.profilePicture ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                quiz.owner.username
              )}`
            }
            alt={`${quiz.owner.firstName} ${quiz.owner.lastName}'s profile picture`}
            width={60}
            height={60}
            className="rounded-sm"
          />
          <div className="flex flex-col gap-2 text-black">
            <h2 className="text-4xl font-bold">
              {quiz.owner.firstName} {quiz.owner.lastName}
            </h2>
            <p>{quiz.description}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {quiz.links &&
            quiz.links.map((link) => (
              <QuizLink href={link.description}>
                <DynamicIcon
                  name={linkTypes[link.type].icon}
                  color="black"
                  size={20}
                />
              </QuizLink>
            ))}
        </div>
      </div>
      <div className="p-8">
        {quiz.questions.map((question) => (
          <QuestionCard
            number={quiz.questions.findIndex((q) => q.id === question.id)}
            questionName={question.questionName}
            options={question.options} //golly we need to find a better way to do this
            correctAnswer={question.correctAnswer}
            correctExplanation={question.correctAnswerExplanation}
          />
        ))}
      </div>
      <div className="w-full bg-pink-100 p-8 flex flex-col gap-2">
        <h2 className="text-2xl">
          This is the end of {quiz.owner.firstName}'s BioQuiz
        </h2>
        <div className="flex flex-row gap-2">
          <div className="rounded-2xl flex flex-row gap-2 bg-pink-200 self-start w-fit">
            <div className="rounded-full p-2 bg-pink-300">
              <MailIcon width={16} height={16} />
            </div>
            <div className="flex flex-row gap-2 items-center mr-2">
              <b>Email</b> <p>(admin@example.com)</p>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row gap-2 bg-pink-200 self-start w-fit">
            <div className="rounded-full p-2 bg-pink-300">
              <PhoneIcon width={16} height={16} />
            </div>
            <div className="flex flex-row gap-2 items-center mr-2">
              <b>Phone</b> <p>(888-555-1234)</p>
            </div>
          </div>
        </div>
        <p>Create your own BioQuiz</p>
      </div>
    </div>
  );
}
