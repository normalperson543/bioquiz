"use client";
import Image from "next/image";

export default function Comment({
  profilePicture,
  username,
  contents,
}: {
  profilePicture: string;
  username: string;
  contents: string;
}) {
  return (
    <div className="flex flex-row gap-2 bg-pink-200 p-4 rounded-sm">
      <Image
        src={profilePicture}
        alt={`Profile picture for ${username}`}
        width={32}
        height={32}
        className="rounded-sm w-8 h-8"
      />
      <div className="flex flex-col gap-2">
        <b>{username}</b>
        <p>{contents}</p>
      </div>
    </div>
  );
}
