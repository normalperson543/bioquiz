import { comingSoon } from "@/lib/fonts";
import { FileCheckIcon } from "lucide-react";
import Button from "../button";
export default function DashboardUI({ username }: { username: string }) {
  return (
    <div className={`${comingSoon.className} flex flex-col gap-2`}>
      <div className="bg-pink-100 p-4 flex flex-col gap-2">
        <h2 className="text-3xl font-bold">My quiz dashboard</h2>
        <p>hi {username}, what a nice day it is to create a new quiz!</p>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-col bg-pink-50 border-pink-100 border-solid border-2">
          <div className="w-full p-4 flex flex-row gap-2">
            <div className="flex-1">
              <FileCheckIcon width={24} height={24} />
              <h3 className="text-lg font-bold">quiz #1</h3>
            </div>

            <Button>Play</Button>
          </div>
          <div className="w-full p-4 flex flex-row gap-2">
            <p>1,854 plays, 2,971 views</p>
          </div>
        </div>
      </div>
    </div>
  );
}
