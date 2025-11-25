import Link from "next/link";
import Button from "./button";
import {
  FileCheckIcon,
  EditIcon,
  GlobeLockIcon,
  TrashIcon,
} from "lucide-react";

export default function QuizResult({
  name,
  creationDate,
  id,
}: {
  name: string;
  creationDate: Date;
  id: string;
}) {
  return (
    <div className="bg-pink-50 border-pink-100 border-solid border-2 flex flex-row gap-2">
      <div className="flex flex-col p-4 gap-2 flex-1">
        <div className="w-full flex flex-row gap-2">
          <FileCheckIcon width={24} height={24} />
          <h3 className="text-lg font-bold">{name}</h3>
        </div>
        <div className="w-full flex flex-row gap-2">
          <p>Created {creationDate.toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Link href={`/quizzes/${id}`}>
          <Button>
            <EditIcon width={16} height={16} />
            Play/Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
