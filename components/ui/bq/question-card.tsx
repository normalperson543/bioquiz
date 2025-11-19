import {
  CheckIcon,
  MessageCircleQuestion,
  MessageSquareIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Profile } from "@prisma/client";
import { icons } from "@/lib/constants";
import Button from "../button";
import { useUser } from "@clerk/nextjs";
import { OptionWithPublicInfo } from "@/lib/types";

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
  canEdit,
  answered,
}: {
  number: number;
  questionName: string;
  options: OptionWithPublicInfo[];
  correctAnswer: string;
  correctExplanation: string;
  comments?: null;
  lockedFromAnsweringDb: boolean;
  handleAnswer: (answer: string) => void;
  onEdit: () => void;
  canEdit: boolean;
  answered: Profile[];
}) {
  const [selAnswer, setSelAnswer] = useState("");
  const user = useUser();
  let loaded = false;
  
  useEffect(() => {
    if (loaded) return;
    console.log("dksfjlsk")
    options.forEach((option) => {
      console.log(user)
      if (
        option.answered.findIndex(
          (profile: Profile) => profile.id === (user.user?.id as string),
        ) > -1
      ) {
        setSelAnswer(option.id);
      }
    });
    loaded = true
  }, [options, user]);

  console.log("boop", answered);

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
        {canEdit && (
          <div className="flex flex-row gap-2">
            <Button onClick={onEdit}>
              <PencilIcon width={16} height={16} />
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          <p>{questionName}</p>
        </div>
        {options.map((option) => (
          <button
            className={`w-full p-4 flex flex-row justify-start rounded-full border border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2 ${option.id === selAnswer && "border-blue-400! bg-blue-300! hover:bg-blue-400!"}`}
            onClick={() => handleSelectAnswer(option.id)}
            disabled={
              lockedFromAnsweringDb &&
              (selAnswer !== "" ||
                answered.findIndex(
                  (profile: Profile) =>
                    profile.id === (user.user?.id as string),
                ) > -1)
            }
          >
            <div
              className={`bg-pink-400 p-1 w-8 h-8 rounded-full ${option.id === selAnswer && "bg-blue-400!"}`}
            >
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
