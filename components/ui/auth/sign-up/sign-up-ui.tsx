"use client";
import {
  ArrowRightIcon,
  KeyIcon,
  LockIcon,
  MailIcon,
  TriangleAlertIcon,
  UnlockIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useActionState, useState } from "react";
import Button from "../../button";
import { comingSoon } from "@/lib/fonts";
import { signInWithCredentials, register } from "@/lib/actions";

export default function SignUpUI() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, formAction, isPending] = useActionState(register, undefined);

  return (
    <div
      className={`${comingSoon.className} flex flex-col w-full h-full items-center justify-center`}
    >
      <div className="flex flex-col gap-2 w-1/2">
        <div className="flex flex-row gap-2 items-center">
          <div className="p-2 bg-pink-200 rounded-full">
            <UserPlusIcon width={24} height={24} />
          </div>
          <h2 className="text-4xl font-bold">Sign up</h2>
        </div>

        <p>want to create your own quizzes?</p>
        <form action={formAction}>
          <div className="flex flex-col gap-2 bg-pink-50 p-4 rounded-sm border-pink-100 border-2">
            <div className="flex flex-row gap-3 items-center">
              <div className="p-2 bg-pink-200 rounded-full">
                <UserIcon width={16} height={16} />
              </div>
              <label className="font-bold">Username</label>
            </div>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
            />
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

            <div className="flex flex-row gap-3 items-center">
              <div className="p-2 bg-pink-200 rounded-full">
                <KeyIcon width={16} height={16} />
              </div>
              <label className="font-bold">Confirm your password</label>
            </div>

            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
            />
            {confirmPassword.length > 0 && confirmPassword !== password && (
              <div className="flex flex-row gap-2 bg-red-100 border-red-200 border-2 p-4">
                <TriangleAlertIcon width={16} height={16} />
                The passwords don't match!
              </div>
            )}
            <Button>
              <ArrowRightIcon width={16} height={16} />
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
