"use client";

import { comingSoon } from "@/lib/fonts";
import Button from "../button";
import { ArrowRightIcon } from "lucide-react";

export default function HomepageUI() {
  return (
    <div
      className={`${comingSoon.className} flex flex-col gap-6 bg-pink-50 w-full h-full`}
    >
      <div className="p-12 flex flex-col gap-4 items-start bg-pink-100">
        <h2 className="text-6xl font-bold">Simple and easy quizzes</h2>
        <p className="text-3xl">
          Share your interests through customizable and fun quizzes.
        </p>
        <Button>
          <ArrowRightIcon width={16} height={16} /> join for free :D
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-12">
        <h3 className="text-2xl font-bold">
          so how does bioquiz work? {">"}.{"<"}
        </h3>
        <p>
          create an account, create a quiz, add questions about yourself, and
          publish!
        </p>
        <p>
          it&apos;s all about expressing what you like and your personality in a
          short quiz!
        </p>
        <p>
          this is just a MVP, but hopefully when i have more motivation i can
          come back to this :p
        </p>
      </div>
    </div>
  );
}
