import DashboardUI from "@/components/ui/dashboard/dashboard-ui";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await auth()
  return <DashboardUI username={user?.sessionClaims?.username as string} />
}