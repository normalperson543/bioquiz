import {
  CheckIcon,
  MessageCircleQuestion,
  MessageSquareIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Option } from "@prisma/client";
import { icons } from "@/lib/constants";
import Button from "../button";

export default function QuestionCard({
  number,
  questionName,
  options,
  correctAnswer,
  correctExplanation,
  lockedFromAnsweringDb,
  comments,
  handleAnswer,
  onEdit,
}: {
  number: number;
  questionName: string;
  options: Option[];
  correctAnswer: string;
  correctExplanation: string;
  comments?: null;
  lockedFromAnsweringDb: boolean;
  handleAnswer: (answer: string) => void;
  onEdit: () => void;
}) {
  const [selAnswer, setSelAnswer] = useState("");

  console.log("boop", correctAnswer);

  function handleSelectAnswer(optionId: string) {
    handleAnswer(optionId);
    setSelAnswer(optionId);
  }

  return (
    <div className="w-full rounded-sm bg-pink-100">
      <div className="w-full rounded-t-sm p-4 bg-pink-200 flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 flex-1">
          <div className="rounded-full bg-pink-300 p-2">
            <MessageCircleQuestion width={16} height={16} />
          </div>
          <h2 className="text-xl">Question {number}</h2>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={onEdit}>
            <PencilIcon width={16} height={16} />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          <p>{questionName}</p>
        </div>
        {options.map((option) => (
          <button
            className="w-full p-4 flex flex-row justify-start rounded-full border-1 border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2"
            onClick={() => handleSelectAnswer(option.id)}
          >
            <div className="bg-pink-400 p-1 w-8 h-8 rounded-full">
              {icons[Number(option.icon ?? 0)]}
            </div>
            <b>{option.name}</b>
          </button>
        ))}
      </div>
      {selAnswer === correctAnswer && (
        <div>
          <div className="w-full rounded-t-sm p-4 bg-green-200 flex flex-row gap-4 items-center">
            <div className="rounded-full bg-green-300 p-2">
              <CheckIcon width={16} height={16} />
            </div>
            <h2 className="text-xl font-bold">Correct</h2>
          </div>
          {correctExplanation && (
            <div className="w-full bg-green-100 p-4">
              <p>{correctExplanation}</p>
            </div>
          )}
        </div>
      )}
      {selAnswer !== "" && selAnswer !== correctAnswer && (
        <div>
          <div className="w-full rounded-t-sm p-4 bg-red-200 flex flex-row gap-4 items-center">
            <div className="rounded-full bg-red-300 p-2">
              <XIcon width={16} height={16} />
            </div>
            <h2 className="text-xl font-bold">Incorrect</h2>
          </div>
          {correctExplanation && (
            <div className="w-full bg-red-100 p-4">
              <p>{correctExplanation}</p>
            </div>
          )}
        </div>
      )}
      <div className="w-full flex flex-col gap-2 p-4">
        <div className="w-full flex flex-row gap-2 items-center">
          <MessageSquareIcon width={16} height={16} />
          <h3>Comments</h3>
          <p className="text-pink-400">Only users logged in can comment</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 bg-pink-200 p-4 rounded-sm">
            <Image
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Profile picture"
              width={32}
              height={32}
              className="rounded-sm w-8 h-8"
            />
            <div className="flex flex-col gap-2">
              <b>John Doe</b>
              <p>This is a comment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
