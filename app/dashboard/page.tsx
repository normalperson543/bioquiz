import DashboardUI from "@/components/ui/dashboard/dashboard-ui";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getQuizzes } from "@/lib/data";

export default async function DashboardPage() {
  const user = await auth()
  if (!user || !user.userId) redirect("/auth/login")
  const quizzes = await getQuizzes(user.userId)
  return <DashboardUI username={user?.sessionClaims?.username as string} createdQuizzes={quizzes} />
}