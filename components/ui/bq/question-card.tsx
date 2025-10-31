import { Option } from "@/lib/types";
import {
  CheckIcon,
  MessageCircleQuestion,
  MessageSquareIcon,
} from "lucide-react";
import Image from "next/image";

export default function QuestionCard({
  number,
  questionName,
  options,
  isCorrect,
  correctExplanation,
  comments,
}: {
  number: number;
  questionName: string;
  options: Option[];
  isCorrect?: boolean;
  correctExplanation: string;
  comments?: null;
}) {
  return (
    <div className="w-full rounded-sm bg-pink-100 shadow-md shadow-pink-200">
      <div className="w-full rounded-t-sm p-4 bg-pink-200 flex flex-row gap-4 items-center">
        <div className="rounded-full bg-pink-300 p-2">
          <MessageCircleQuestion width={16} height={16} />
        </div>
        <h2 className="text-xl">Question {number}</h2>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          <p>{questionName}</p>
        </div>
        <button className="w-full p-4 flex flex-row justify-start rounded-full border-1 border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2">
          <div className="bg-pink-400 p-1 w-8 h-8 rounded-full">☁️</div>{" "}
          <b>Doing something</b>
        </button>
        <button className="w-full p-4 flex flex-row justify-start rounded-full border-1 border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2">
          <div className="bg-pink-400 p-1 w-8 h-8 rounded-full">☁️</div>{" "}
          <b>Doing something</b>
        </button>
        <button className="w-full p-4 flex flex-row justify-start rounded-full border-1 border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2">
          <div className="bg-pink-400 p-1 w-8 h-8 rounded-full">☁️</div>{" "}
          <b>Doing something</b>
        </button>
        <button className="w-full p-4 flex flex-row justify-start rounded-full border-1 border-pink-400 bg-pink-300 hover:bg-pink-400 items-center gap-2">
          <div className="bg-pink-400 p-1 w-8 h-8 rounded-full">☁️</div>{" "}
          <b>Doing something</b>
        </button>
      </div>
      {isCorrect && (
        <div>
          <div className="w-full rounded-t-sm p-4 bg-green-200 flex flex-row gap-4 items-center">
            <div className="rounded-full bg-green-300 p-2">
              <CheckIcon width={16} height={16} />
            </div>
            <h2 className="text-xl font-bold">Correct</h2>
          </div>
          <div className="w-full bg-green-100 p-4">
            <p>{correctExplanation}</p>
          </div>
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
