"use client";

import { comingSoon } from "@/lib/fonts";
import {
  CheckIcon,
  InstagramIcon,
  MailIcon,
  MessageCircleQuestion,
  MessageSquareIcon,
  PhoneIcon,
} from "lucide-react";
import Image from "next/image";

export default function QuizPage() {
  return (
    <div
      className={`w-full h-full bg-pink-50 text-black ${comingSoon.className}`}
    >
      <div className="flex flex-row gap-2 w-full pl-12 pr-12 pt-16 pb-16 rounded-sm bg-pink-100 items-center">
        <div className="flex flex-1 flex-row gap-4 items-center">
          <Image
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="Profile picture"
            width={60}
            height={60}
            className="rounded-sm"
          />
          <div className="flex flex-col gap-2 text-black">
            <h2 className="text-4xl font-bold">normalperson543</h2>
            <p>This is a short introduction of yourself.</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button className="p-4 rounded-full bg-pink-200 text-black hover:bg-pink-300">
            <MailIcon width={20} height={20} />
          </button>
          <button className="p-4 rounded-full bg-pink-200 text-black hover:bg-pink-300">
            <PhoneIcon width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="w-full rounded-sm bg-pink-100 shadow-md shadow-pink-200">
          <div className="w-full rounded-t-sm p-4 bg-pink-200 flex flex-row gap-4 items-center">
            <div className="rounded-full bg-pink-300 p-2">
              <MessageCircleQuestion width={16} height={16} />
            </div>
            <h2 className="text-xl">Question 1</h2>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              <p>Lorem ipsum dolor sit amet?</p>
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
          <div className="w-full rounded-t-sm p-4 bg-green-200 flex flex-row gap-4 items-center">
            <div className="rounded-full bg-green-300 p-2">
              <CheckIcon width={16} height={16} />
            </div>
            <h2 className="text-xl font-bold">Correct</h2>
          </div>
          <div className="w-full bg-green-100 p-4">
            <p>This is the explanation.</p>
          </div>
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
      </div>
      <div className="w-full bg-pink-100 shadow-md shadow-pink-200 p-8 flex flex-col gap-2">
        <h2 className="text-2xl">
          This is the end of normalperson543's BioQuiz
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
