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
