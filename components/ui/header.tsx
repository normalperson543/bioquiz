"use client";

import { PlusIcon } from "lucide-react";
import Button from "./button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Header() {
  return (
    <div className="flex flex-row gap-2 w-full p-2 items-center">
      <div className="flex flex-1 flex-row gap-2 w-full items-center">
        <Button>
          <PlusIcon width={16} height={16} />
          create :D
        </Button>
      </div>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
