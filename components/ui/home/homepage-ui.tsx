'use client'

import { comingSoon } from "@/lib/fonts";
import QuestionCard from "../bq/question-card";
import Button from "../button";
import { ArrowRightIcon } from "lucide-react";

export default function HomepageUI() {
  return (
    <div className={`${comingSoon.className} flex flex-col gap-6 bg-pink-50 w-full h-full`}>
      <div className="p-12 flex flex-col gap-4 items-start bg-pink-100">
        <h2 className="text-6xl font-bold">Simple and easy quizzes</h2>
        <p className="text-3xl">Share your interests through customizable and fun quizzes.</p>
        <Button><ArrowRightIcon width={16} height={16} /> join for free :D</Button>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold p-12">check out these cool quizzes {">"}.{"<"}</h3>
        
      </div>
    </div>
  );
}
