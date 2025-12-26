import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { prisma } from "./lib/db";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/auth/login(.*)",
  "/quizzes/(.*)",
  "/",
]);

function proxyMiddleware(req: NextRequest) {
  if (req.nextUrl.pathname.match("__clerk")) {
    const proxyHeaders = new Headers(req.headers);
    proxyHeaders.set(
      "Clerk-Proxy-Url",
      process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
    );
    proxyHeaders.set("Clerk-Secret-Key", process.env.CLERK_SECRET_KEY || "");
    if (req.ip) {
      proxyHeaders.set("X-Forwarded-For", req.ip);
    } else {
      proxyHeaders.set(
        "X-Forwarded-For",
        req.headers.get("X-Forwarded-For") || "",
      );
    }

    const proxyUrl = new URL(req.url);
    proxyUrl.host = "frontend-api.clerk.dev";
    proxyUrl.port = "443";
    proxyUrl.protocol = "https";
    proxyUrl.pathname = proxyUrl.pathname.replace("/__clerk", "");

    return NextResponse.rewrite(proxyUrl, {
      request: {
        headers: proxyHeaders,
      },
    });
  }

  return null;
}

export default clerkMiddleware(async (auth, req) => {
  const proxyResponse = proxyMiddleware(req);
  if (proxyResponse) {
    return proxyResponse;
  }

  const { isAuthenticated, sessionClaims } = await auth();
  if (isAuthenticated) {
    await prisma.profile.upsert({
      where: {
        id: sessionClaims.userId as string,
      },
      update: {
        profilePicture: sessionClaims.image_url,
      },
      create: {
        id: sessionClaims.userId as string,
        username: sessionClaims.username,
      },
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
