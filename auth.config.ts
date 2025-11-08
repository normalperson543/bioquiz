import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./lib/db";
import bcryptjs from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      if (!user.usePasswordSignIn) return; // check if user is using credential sign in
      const passwordMatch = await bcryptjs.compare(
        password,
        user.password as string
      );
      if (passwordMatch) {
        return user;
      }
    }
  } catch {
    return;
  }
}

async function saltAndHashPw(pw: string) {
  const saltRounds = 10;
  const hashed = await bcryptjs.hash(pw, saltRounds);
  return hashed;
}

export async function register(formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;

  const hashed = await saltAndHashPw(password);
  const userCount = await prisma.profile.count({
    where: {
      username: username,
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
        firstName: firstName,
        lastName: lastName,
        password: hashed,
        usePasswordSignIn: false,
      },
    });
    return user;
  } catch {
    throw new Error("Whoops, there was a problem creating your account.");
  }
}
export default {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = null;
        // get user from db
        user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
