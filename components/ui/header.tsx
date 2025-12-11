"use client";

import {
  KeyIcon,
  LayoutDashboardIcon,
  PlusIcon,
  UserPlusIcon,
} from "lucide-react";
import Button from "./button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { createQuiz } from "@/lib/actions";
import { comingSoon } from "@/lib/fonts";

export default function Header() {
  return (
    <div className={`${comingSoon.className} flex flex-row gap-2 w-full p-2 items-center bg-pink-100 fixed h-16`}>
      <div className="flex flex-1 flex-row gap-4 w-full items-center">
        <Link href="/" className="font-bold text-2xl">
          BioQuiz
        </Link>
        <Button onClick={createQuiz}>
          <PlusIcon width={16} height={16} />
          create :D
        </Button>
        <Link href="/dashboard">
          <Button>
            <LayoutDashboardIcon width={16} height={16} />
            dashboard
          </Button>
        </Link>
      </div>
      <SignedOut>
        <SignInButton>
          <Button>
            <KeyIcon width={16} height={16} />
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button>
            <UserPlusIcon width={16} height={16} />
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
