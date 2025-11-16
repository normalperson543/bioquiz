import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { prisma } from "./lib/db";

const isPublicRoute = createRouteMatcher(["/auth/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, sessionClaims } = await auth();
  if (isAuthenticated) {
    console.log("Upserting")
    console.log(sessionClaims)
    prisma.profile.upsert({
      where: {
        id: sessionClaims.userId as string,
      },
      update: {},
      create: {
        username: sessionClaims.username
      }
    });
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
