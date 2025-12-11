import Image from "next/image";
import { useState } from "react";
import Button from "../button";
import { SendHorizonalIcon } from "lucide-react";

export default function CommentTextbox({
  profilePicture,
  onSubmit,
}: {
  profilePicture: string;
  onSubmit: (postContents: string) => void;
}) {
  const [commentText, setCommentText] = useState("");

  function handleSubmit() {
    onSubmit(commentText);
    setCommentText("");
  }
  return (
    <div className="flex flex-row gap-2 w-full items-start">
      <Image
        src={profilePicture}
        width={32}
        height={32}
        alt="Your profile picture"
      />
      <div className="flex flex-col gap-2 w-full items-start">
        <textarea
          rows={3}
          className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2 w-full"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <Button onClick={handleSubmit}>
          <SendHorizonalIcon width={16} height={16} />
          Send
        </Button>
      </div>
    </div>
  );
}
