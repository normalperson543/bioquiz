'use server'

import { register } from "module";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInWithCredentials(prevState: string | undefined, formData: FormData) {
  try {
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password")
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type){
        case "CredentialsSignin":
          return "The username or password is incorrect."
        default:
          return "Auth error"
      }
    }
    else {
      revalidatePath("/")
      redirect("/")
    }
  }
}
export async function signUp(prevState: string | undefined, formData: FormData) {
  try {
    await register(formData);
    redirect("/auth/login")
  }
  catch (e) {
    if (e instanceof Error) {
      if (e.message === "NEXT_REDIRECT") redirect("/auth/login")
        return e.message
    }
  }
}