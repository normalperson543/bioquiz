"use client";
import { KeyIcon, LockIcon, MailIcon, UnlockIcon } from "lucide-react";
import { useActionState, useState } from "react";
import Button from "../button";
import { comingSoon } from "@/lib/fonts";
import { signInWithCredentials } from "@/lib/actions";

export default function LoginUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, formAction, isPending] = useActionState(signInWithCredentials, undefined)

  return (
    <div
      className={`${comingSoon.className} flex flex-col w-full h-full items-center justify-center`}
    >
      <div className="flex flex-col gap-2 w-1/2">
        <div className="flex flex-row gap-2 items-center">
          <div className="p-2 bg-pink-200 rounded-full">
            <LockIcon width={24} height={24} />
          </div>
          <h2 className="text-4xl font-bold">Login</h2>
        </div>

        <p>because everything works better when you login!</p>
        <form action={formAction}>
          <div className="flex flex-col gap-2 bg-pink-50 p-4 rounded-sm border-pink-100 border-2">
            <div className="flex flex-row gap-3 items-center">
              <div className="p-2 bg-pink-200 rounded-full">
                <MailIcon width={16} height={16} />
              </div>
              <label className="font-bold">Email</label>
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
            />
            <div className="flex flex-row gap-3 items-center">
              <div className="p-2 bg-pink-200 rounded-full">
                <KeyIcon width={16} height={16} />
              </div>
              <label className="font-bold">Password</label>
            </div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
            />
            <Button>
              <UnlockIcon width={16} height={16} />
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
