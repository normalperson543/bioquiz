"use server";

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { saltAndHashPw } from "@/auth.config";

export async function signInWithCredentials(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return "The username or password is incorrect.";
        default:
          return "Auth error";
      }
    } else {
      revalidatePath("/");
      redirect("/");
    }
  }
}
export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await register(formData);
    redirect("/auth/login");
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "NEXT_REDIRECT") redirect("/auth/login");
      return e.message;
    }
  }
}
export async function register(prevState: string | undefined, formData: FormData) {
  console.log("Beep");
  console.log(formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const hashed = await saltAndHashPw(password);
  const userCount = await prisma.profile.count({
    where: {
      email: email,
    },
  });
  if (userCount > 0) {
    throw new Error("Whoops, this user already exists! Please try to log in.");
  }
  try {
    const user = await prisma.profile.create({
      data: {
        username: username,
        email: email,
        password: hashed,
        usePasswordSignIn: true,
      },
    });
    return user;
  } catch (e) {
    console.error(e)
    throw new Error("Whoops, there was a problem creating your account.");
  }
}
